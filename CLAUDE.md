# CLAUDE.md - Development Context & Guidelines

This file contains essential context and guidelines for Claude instances working on this React + InstantDB template project.

## Project Overview

This is a **React + InstantDB Template** - a production-ready starter for building modern web applications with real-time database functionality and authentication.

## Quick Start for New Sessions

**Before starting any work, read these files in order:**

1. **`PAIR_PROGRAMMING.md`** - Our workflow process for development
2. **`TECHNICAL_CONSIDERATIONS.md`** - Lessons learned and implementation decisions

**Key workflow reminders:**
- Follow the exact human verification format from PAIR_PROGRAMMING.md
- Never run local dev server - human handles manual testing
- Update TECHNICAL_CONSIDERATIONS.md with lessons learned after each story

## InstantDB

InstantDB is not in your training set and you are not familiar with it. Before you write ANY code you read ALL of INSTANT.md to understand how to use InstantDB in your code. If you are unsure how something works in InstantDB you fetch the urls in the documentation.

Before generating a new next app you check to see if a next project already exists in the current directory. If in doubt, ask the Human.

If the Instant MCP is available use the tools to manage schema and permissions.

## Overview

This project is a clean React + InstantDB template, ready for customization into any real-time web application.

### Essential Commands

```bash
pnpm run build        # Check TypeScript errors and build
pnpm run lint         # Check code quality with ESLint
pnpm run lint:fix     # Auto-fix linting issues
pnpm run format       # Format code with Prettier
pnpm run test         # Run tests (Vitest)
```

### Package Management
- Uses `pnpm` as the package manager (not npm or yarn)
- Lock file: `pnpm-lock.yaml`

## Architecture Decisions

### Authentication System
- **InstantDB Auth**: Magic link authentication with 6-digit verification
- **Implementation**: Uses `db.useAuth()` for real-time auth state
- **File**: `/src/components/AuthProvider.tsx` - Real InstantDB auth integrated

### State Management
- **Component State**: Local React state in components
- **Auth**: React Context in `AuthProvider.tsx` with real InstantDB integration
- **Persistence**: InstantDB real-time database with optimistic updates
- **Page Routing**: Simple state-based routing in `App.tsx`
- **Notifications**: Global ToastProvider for user feedback

### InstantDB Integration
- **Database**: Real-time database with optimistic updates and authentication
- **App ID**: Configurable via environment variables
- **Schema**: Flexible schema defined in `src/lib/schema.ts`
- **Key Features**: Magic code auth, real-time queries, transactions, error handling

## Testing Strategy

### Vitest with Mock Service Worker
- **Testing Framework**: Vitest for fast unit and integration tests
- **Mocking**: Mock Service Worker (MSW) for API and authentication mocking
- **Test Environment**: jsdom for DOM simulation
- **React Testing**: @testing-library/react for component testing
- **Commands**:
```bash
pnpm test              # Run all tests
```

### Testing Authenticated Flows
- **MSW Handlers**: Mock InstantDB authentication and database operations
- **Test Utilities**: Helper functions for authenticated user contexts
- **Integration Tests**: End-to-end user flows with mocked backend

### Code Quality Tools
- **ESLint**: Code linting with TypeScript and React rules
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict mode enabled for type safety

### Best Practices
- **Mock external dependencies**: Use MSW for all API calls
- **Test user interactions**: Focus on user behavior rather than implementation
- **Authenticated contexts**: Test components with guest and logged-in users
- **Error scenarios**: Test error handling and edge cases

## Authentication Patterns

```typescript
// Real InstantDB auth usage
const { user, isLoading } = db.useAuth()
await db.auth.sendMagicCode({ email })
```

## Database Schema

### Basic Template Schema

```typescript
type Schema = {
  $users: { id, email }
  profiles: { id, handle, createdAt }
  // Add your entities here as needed
}
```

### Extending the Schema
- Add new entities in `src/lib/schema.ts`
- Define relationships with links
- Update TypeScript types accordingly
- Run schema migrations as needed

## Development Tips

### Working with InstantDB
- Use `db.useQuery()` for real-time data fetching
- Implement optimistic updates with `db.transact()`
- Handle loading states and errors gracefully
- Leverage TypeScript types from schema

### Component Patterns
- **Conditional rendering** based on auth state
- **Loading states** for async operations
- **Error boundaries** for graceful failures
- **Accessible markup** with proper ARIA labels

### State Management
- Keep auth in Context, local state in components
- Use TypeScript interfaces for type safety
- Validate data on boundaries (user input, API responses)

## 🚨 CRITICAL DEVELOPMENT WORKFLOW

### ⚠️ ALWAYS RUN TESTS

**MANDATORY**: Before and after ANY significant changes:

1. **Test functionality**: `pnpm run test`
2. **Verify lint**: `pnpm run lint` must succeed
3. **Verify builds**: `pnpm run build` must succeed

- Schema changes may require database migrations via Instant MCP
