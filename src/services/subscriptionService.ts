import type { BillingService, SubscriptionChangePreview } from './contracts';
import { userService } from './userService';
import { storageService } from './storageService';
import type { SubscriptionPlanId, UserPlan } from '@/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS, getFirebaseFirestoreInstance, isFirebaseBackendEnabled } from './firebase';
import { wrapFirebaseError } from './firebaseError';
import { toFirestoreSubscription } from './firestoreModels';
import { getPlanTier, getSubscriptionPlan } from '@/features/subscriptions';
import { stripeService } from './stripeService';

type SubscriptionAuditEvent = {
  checkoutMode: 'mock' | 'stripe';
  currentPlan: UserPlan;
  nextPlanId: SubscriptionPlanId;
  nextPlan: UserPlan;
  stripePriceLookupKey?: string;
  updatedAt: string;
  userId: string;
};

type SubscriptionAuditStore = {
  events: readonly SubscriptionAuditEvent[];
};

const SUBSCRIPTION_AUDIT_STORE_KEY = 'acecloudcert.subscriptionEvents.v1';

async function loadStore(): Promise<SubscriptionAuditStore> {
  return (await storageService.getJson<SubscriptionAuditStore>(SUBSCRIPTION_AUDIT_STORE_KEY)) ?? { events: [] };
}

async function saveStore(store: SubscriptionAuditStore) {
  await storageService.setJson(SUBSCRIPTION_AUDIT_STORE_KEY, store);
}

function buildPreview(
  userId: string,
  currentPlan: UserPlan,
  nextPlanId: SubscriptionPlanId,
  checkoutMode: 'mock' | 'stripe' = 'mock',
  checkoutUrl?: string
): SubscriptionChangePreview {
  const selectedPlan = getSubscriptionPlan(nextPlanId);
  const nextPlan = selectedPlan.tier;
  const summary =
    currentPlan === nextPlan
      ? `You are already on ${currentPlan}.`
      : checkoutMode === 'stripe'
        ? `Stripe Checkout is ready for ${selectedPlan.name}. Complete checkout to activate ${nextPlan}.`
        : `Mock checkout will switch this learner from ${currentPlan} to ${selectedPlan.name}. Stripe Checkout can replace this handoff later.`;

  return {
    checkoutMode,
    checkoutUrl,
    currentPlan,
    nextPlan,
    nextPlanId,
    stripePriceLookupKey: selectedPlan.stripePriceLookupKey,
    stripeReady: checkoutMode === 'stripe' && Boolean(checkoutUrl) && Boolean(userId),
    summary
  };
}

export const subscriptionService: BillingService = {
  async getPlan(userId) {
    if (isFirebaseBackendEnabled()) {
      try {
        const db = getFirebaseFirestoreInstance();

        if (db) {
          const snapshot = await getDoc(doc(db, FIRESTORE_COLLECTIONS.subscriptions, userId));

          if (snapshot.exists()) {
            const plan = snapshot.data().plan;

            if (plan === 'Free' || plan === 'Silver' || plan === 'Gold') {
              return plan;
            }
          }
        }
      } catch (error) {
        wrapFirebaseError('Load Firestore subscription plan', error);
      }
    }

    const profile = await userService.getProfileById(userId);
    return profile?.plan ?? 'Free';
  },

  async previewPlanChange(userId, nextPlanId) {
    const currentPlan = await subscriptionService.getPlan(userId);
    const checkout = await stripeService.createCheckoutSession({
      planId: nextPlanId,
      userId
    });
    return buildPreview(userId, currentPlan, nextPlanId, checkout.checkoutMode, checkout.checkoutUrl);
  },

  async updatePlan(userId, nextPlanId) {
    const currentPlan = await subscriptionService.getPlan(userId);
    const nextPlan = getPlanTier(nextPlanId);
    const checkout = await stripeService.createCheckoutSession({
      planId: nextPlanId,
      userId
    });
    const profile = await userService.updatePlan(userId, nextPlan);
    const updatedAt = new Date().toISOString();

    if (isFirebaseBackendEnabled()) {
      try {
        const db = getFirebaseFirestoreInstance();

        if (db) {
          await setDoc(
            doc(db, FIRESTORE_COLLECTIONS.subscriptions, userId),
            toFirestoreSubscription(userId, currentPlan, nextPlanId, checkout.checkoutMode),
            { merge: true }
          );
        }

        return {
          ...buildPreview(userId, currentPlan, nextPlanId, checkout.checkoutMode, checkout.checkoutUrl),
          profile,
          updatedAt
        };
      } catch (error) {
        wrapFirebaseError('Save Firestore subscription', error);
      }
    }

    const store = await loadStore();
    const event: SubscriptionAuditEvent = {
      checkoutMode: checkout.checkoutMode,
      currentPlan,
      nextPlanId,
      nextPlan,
      stripePriceLookupKey: getSubscriptionPlan(nextPlanId).stripePriceLookupKey,
      updatedAt,
      userId
    };

    await saveStore({
      events: [event, ...store.events].slice(0, 100)
    });

    return {
      ...buildPreview(userId, currentPlan, nextPlanId, checkout.checkoutMode, checkout.checkoutUrl),
      profile,
      updatedAt
    };
  }
};
