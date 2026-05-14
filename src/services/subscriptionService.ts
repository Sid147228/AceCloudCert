import type { BillingService, SubscriptionChangePreview } from './contracts';
import { userService } from './userService';
import { storageService } from './storageService';
import type { UserPlan } from '@/types';

type SubscriptionAuditEvent = {
  checkoutMode: 'mock';
  currentPlan: UserPlan;
  nextPlan: UserPlan;
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

function buildPreview(userId: string, currentPlan: UserPlan, nextPlan: UserPlan): SubscriptionChangePreview {
  const summary =
    currentPlan === nextPlan
      ? `You are already on ${currentPlan}.`
      : `Mock checkout will switch this local learner from ${currentPlan} to ${nextPlan}. Stripe Checkout can replace this handoff later.`;

  return {
    checkoutMode: 'mock',
    currentPlan,
    nextPlan,
    stripeReady: Boolean(userId),
    summary
  };
}

export const subscriptionService: BillingService = {
  async getPlan(userId) {
    const profile = await userService.getProfileById(userId);
    return profile?.plan ?? 'Free';
  },

  async previewPlanChange(userId, nextPlan) {
    const currentPlan = await subscriptionService.getPlan(userId);
    return buildPreview(userId, currentPlan, nextPlan);
  },

  async updatePlan(userId, nextPlan) {
    const currentPlan = await subscriptionService.getPlan(userId);
    const profile = await userService.updatePlan(userId, nextPlan);
    const updatedAt = new Date().toISOString();
    const store = await loadStore();
    const event: SubscriptionAuditEvent = {
      checkoutMode: 'mock',
      currentPlan,
      nextPlan,
      updatedAt,
      userId
    };

    await saveStore({
      events: [event, ...store.events].slice(0, 100)
    });

    return {
      ...buildPreview(userId, currentPlan, nextPlan),
      profile,
      updatedAt
    };
  }
};
