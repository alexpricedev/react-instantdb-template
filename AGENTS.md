# AGENTS.md — Working Context for Future Instances

This repository is a React + InstantDB template. Use this guide to load the right context and follow the intended workflow.

## Read This First (in order)
1. CLAUDE.md — Development context, critical workflow, InstantDB notes
2. PAIR_PROGRAMMING.md — Communication + TDD/XP process
3. INSTANT.md — InstantDB quick guide + links to official docs
4. README.md — Project overview, commands, structure
5. TECHNICAL_CONSIDERATIONS.md — Add lessons learned after each story

## Core Source Files to Open
- instant.schema.ts — Canonical InstantDB schema and exported types
- instant.perms.ts — InstantDB permissions (rules/binds)
- src/lib/instant.ts — Instant client init (uses VITE_INSTANTDB_APP_ID)
- src/components/AuthProvider.tsx — Auth context using Instant auth
- src/hooks/useAuthWithProfile.ts — Auth + profile query logic
- src/components/HomePage.tsx — Example UI with conditional auth rendering
- src/components/Header.tsx, AccountPage.tsx, LoginModal.tsx, DisplayNameModal.tsx — Main UX flows

## Testing Stack
- Vitest configured via vitest.config.ts (jsdom, setup files)
- MSW server and handlers in tests/msw/
- Global test setup: tests/setup.ts (MSW + jest-dom)
- Example tests in tests/: schema.test.ts, homepage.auth.test.tsx

Run tests in non-watch mode:
- pnpm run test    # uses "vitest run"

## Commands (pnpm only)
- pnpm run build   — Typecheck + Vite build
- pnpm run lint    — ESLint (0 warnings allowed)
- pnpm run lint:fix
- pnpm run format  — Prettier
- pnpm run dev     — Vite dev server (human runs manual testing)

## Environment
- Required: .env with `VITE_INSTANTDB_APP_ID`
- Do not introduce npm or Playwright. Use pnpm + Vitest + MSW.

## InstantDB Guidance
- Always read INSTANT.md and follow linked docs for schema, queries (InstaQL), transactions (InstaML), auth, permissions, storage, presence.
- Client: use `@instantdb/react` only (no backend usage except admin SDK where applicable).
- Dates are numbers (timestamps), not Date objects in schema.
- Writes: `db.transact(...)`, Reads: `db.useQuery(...)`, Auth: `db.useAuth()`.
- Schema/types come from instant.schema.ts.

## Development Workflow
- Before/after significant changes: run `pnpm run test`, `pnpm run lint`, `pnpm run build`.
- Follow TDD/XP from PAIR_PROGRAMMING.md (clarify requirements, propose approaches, seek approval for commits).
- Keep changes minimal and focused; do not fix unrelated code.
- Update TECHNICAL_CONSIDERATIONS.md with any decisions, pitfalls, or patterns discovered.
- If schema/permissions change, reflect updates in instant.schema.ts / instant.perms.ts and consider Instant CLI/MCP usage as appropriate.

## What Context to Include When Working
- This file (AGENTS.md) + the five “Read This First” files.
- Relevant component/hook/lib files for the feature being changed (see Core Source Files list).
- Any tests touching the area being modified; add/adjust tests under tests/ using MSW + Testing Library.
- Environment assumptions: VITE_INSTANTDB_APP_ID present; do not run external services unless approved by the human.

## Gotchas
- Lint is strict: fix warnings or locally suppress with justification.
- Tests must not start in watch mode (use `vitest run`).
- Don’t start the dev server on behalf of the user; provide instructions instead.

