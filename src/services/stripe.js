// In real setup, this would call your backend for Stripe checkout sessions
// For now, we simulate plan-based access

export const getSubscriptionStatus = (userEmail) => {
  // TODO: Replace with real API call or Firestore lookup later
  if (userEmail.endsWith('@golduser.com')) return 'Gold';
  if (userEmail.endsWith('@silveruser.com')) return 'Silver';
  return 'Free';
};
