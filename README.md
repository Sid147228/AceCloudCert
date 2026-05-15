# AceCloudCert

AceCloudCert is an Expo React Native Web foundation for a cloud certification learning platform.

## Architecture

The project is organized around typed feature modules and shared contracts:

- `src/app` - application shell and route composition
- `src/components` - reusable UI, layout, card, form, and chart primitives
- `src/features` - feature module definitions for auth, dashboard, certifications, tests, questions, knowledge base, certificates, subscriptions, profile, admin, and legal
- `src/services` - service contracts and backend readiness metadata
- `src/constants` - app, route, and theme constants
- `src/data` - typed seed data for the current foundation
- `src/types` - shared domain types
- `src/utils` - shared helpers

## Commands

```bash
npm install
npm run typecheck
npm run build
npm start
```

The current phase is foundation-only: it keeps the app running while establishing the structure needed for feature-by-feature rebuild work.

## Backend Mode

AceCloudCert runs in local mock mode by default. To enable the Firebase-ready service layer, set the public Expo environment variables in `.env` or Vercel project settings:

```bash
EXPO_PUBLIC_BACKEND_MODE=firebase
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

The Firestore collection names are centralized in `src/services/firebase.ts`:

- `users`
- `certifications`
- `questions`
- `testAttempts`
- `certificates`
- `subscriptions`

If Firebase mode is not requested or the required Firebase variables are missing, the app keeps using the local mock services.

## Stripe Subscription Architecture

Stripe is prepared as a server-side integration only. Do not place `STRIPE_SECRET_KEY`, webhook secrets, or price IDs that should remain private in frontend code.

Client-side mock mode stays active unless explicitly enabled:

```bash
EXPO_PUBLIC_STRIPE_CHECKOUT_ENABLED=false
EXPO_PUBLIC_STRIPE_CHECKOUT_API_URL=/api/stripe/checkout-session
```

Server placeholders:

- `api/stripe/checkout-session.js` - create a Checkout Session server-side later with `STRIPE_SECRET_KEY`.
- `api/stripe/webhook.js` - verify `Stripe-Signature` against the raw body later with `STRIPE_WEBHOOK_SECRET`.

Pricing and entitlement logic lives in `src/features/subscriptions/pricing.ts` and `src/features/subscriptions/helpers.ts`. Premium feature locks should call the entitlement helpers rather than checking plan names directly.

## Design System

The product now uses an AceCloudCert design system with official logo usage, dark enterprise SaaS colors, mobile-first layout, reusable navigation, state components, form controls, cards, tabs, tables, and notification primitives.

Core components live under:

- `src/components/layout`
- `src/components/ui`
- `src/components/cards`
- `src/components/forms`
- `src/components/charts`
