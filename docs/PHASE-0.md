# Approved Phase 0 architecture

- Separate repositories for Customer SPA, Restaurant Monitor, Back Office and shared backend.
- Next.js, React, JavaScript, Tailwind CSS, SCSS, TanStack Query for server state and React local state.
- Centralized Supabase Auth, location-scoped RBAC and RLS. Staff memberships are seeded for early integration; administration is owned by Project 2.
- Shared authoritative backend (rop-backend) owns migrations, versioned OpenAPI/JSON Schema contracts, business rules and cross-application tests. Transfer Project 1 infrastructure incrementally with compatibility checks.
- Preserve Project 1 order lifecycle. Require rejection reasons, support preparation estimates, use atomic transitions, optimistic revision checks and idempotent mutations with history.
- Realtime signals, authoritative refetch on reconnect, polling fallback, duplicate and stale event handling, disabled offline mutations.
- Reusable queues and components, independent synthetic demo, shared isolated integration and hosted staging.
- Vitest, component, contract, PostgreSQL integration, Playwright and cross-application testing; axe accessibility checks; five browser projects. CI gates and predictable HTML/JSON/JUnit reports. Manual QA for physical devices, real assistive technology and visual usability.
- Feature branches target dev, dev promotes to main, main promotes to production after acceptance.

## Roadmap

1. Foundation and automated QA.
2. Staff authentication and authorization.
3. Operational order dashboard.
4. Authoritative order processing.
5. Realtime synchronization.
6. Operational tools, history, notifications and availability.
7. UI/UX refinement.
8. Integration and release QA.

Foundation demonstration uses synthetic order queues and read-only detail views. Project 1 remains independently runnable.
