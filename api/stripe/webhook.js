module.exports = async function stripeWebhookPlaceholder(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  /*
   * Webhook-ready implementation notes:
   * - Keep STRIPE_WEBHOOK_SECRET server-side only.
   * - Verify the Stripe-Signature header against the raw request body before trusting any event.
   * - Handle checkout.session.completed, customer.subscription.updated,
   *   customer.subscription.deleted, invoice.payment_succeeded, and invoice.payment_failed.
   * - Map Stripe subscription status to AceCloudCert subscription status, then update Firestore:
   *   subscriptions/{userId} and users/{userId}.plan.
   * - Return 2xx quickly after validation; do heavier fulfillment asynchronously if needed.
   */
  response.status(501).json({
    message: 'Stripe webhook placeholder. Add server-side Stripe signature verification before enabling production billing.',
    received: true
  });
};
