const allowedPlanIds = new Set(['silver-monthly', 'silver-yearly', 'gold-monthly', 'gold-yearly']);

module.exports = async function checkoutSessionPlaceholder(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const { customerEmail, planId, userId } = request.body ?? {};

  if (!allowedPlanIds.has(planId) || !userId) {
    response.status(400).json({ error: 'A valid paid planId and userId are required.' });
    return;
  }

  response.status(501).json({
    checkoutMode: 'stripe',
    message:
      'Stripe Checkout placeholder. Implement server-side session creation here with STRIPE_SECRET_KEY, selected Stripe price id, success_url, cancel_url, and subscription metadata.',
    planId,
    received: {
      customerEmail,
      userId
    },
    stripeReady: false
  });
};
