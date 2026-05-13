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
