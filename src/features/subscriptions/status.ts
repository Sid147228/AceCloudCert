import type { SubscriptionStatus } from '@/types';

export function mapStripeSubscriptionStatus(status?: string | null): SubscriptionStatus {
  if (!status) {
    return 'free';
  }

  if (status === 'trialing' || status === 'active' || status === 'past_due' || status === 'cancelled' || status === 'incomplete') {
    return status;
  }

  if (status === 'canceled' || status === 'unpaid') {
    return 'cancelled';
  }

  return 'checkout-pending';
}

export function getSubscriptionStatusLabel(status: SubscriptionStatus) {
  const labels: Record<SubscriptionStatus, string> = {
    active: 'Active',
    cancelled: 'Cancelled',
    'checkout-pending': 'Checkout pending',
    free: 'Free',
    incomplete: 'Incomplete',
    'mock-active': 'Mock active',
    past_due: 'Past due',
    trialing: 'Trialing'
  };

  return labels[status];
}
