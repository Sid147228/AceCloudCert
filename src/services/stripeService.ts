import { STRIPE_CHECKOUT_API_PATH, getSubscriptionPlan } from '@/features/subscriptions';
import type { SubscriptionPlanId } from '@/types';

export type CreateCheckoutSessionInput = {
  customerEmail?: string;
  planId: SubscriptionPlanId;
  userId: string;
};

export type CheckoutSessionResult = {
  checkoutMode: 'mock' | 'stripe';
  checkoutUrl?: string;
  message: string;
  planId: SubscriptionPlanId;
  stripeReady: boolean;
};

function getCheckoutEndpoint() {
  return process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_API_URL || STRIPE_CHECKOUT_API_PATH;
}

function isStripeCheckoutEnabled() {
  return process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_ENABLED === 'true';
}

export const stripeService = {
  async createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CheckoutSessionResult> {
    const plan = getSubscriptionPlan(input.planId);

    if (input.planId === 'free') {
      return {
        checkoutMode: 'mock',
        message: 'Free plan does not require Stripe checkout.',
        planId: input.planId,
        stripeReady: false
      };
    }

    if (!isStripeCheckoutEnabled()) {
      return {
        checkoutMode: 'mock',
        message: `${plan.name} is using mock checkout. Enable EXPO_PUBLIC_STRIPE_CHECKOUT_ENABLED=true and implement the server route to redirect to Stripe.`,
        planId: input.planId,
        stripeReady: false
      };
    }

    const response = await fetch(getCheckoutEndpoint(), {
      body: JSON.stringify({
        customerEmail: input.customerEmail,
        planId: input.planId,
        userId: input.userId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error(`Stripe checkout session request failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as Partial<CheckoutSessionResult>;

    return {
      checkoutMode: 'stripe',
      checkoutUrl: payload.checkoutUrl,
      message: payload.message ?? 'Stripe Checkout session created.',
      planId: input.planId,
      stripeReady: Boolean(payload.checkoutUrl)
    };
  }
};
