# CLAUDE.md - Development Context & Guidelines

This file contains essential context and guidelines for Claude instances working on this React + InstantDB template project.

## 🎯 Project Overview

This is a **React + InstantDB Template** - a production-ready starter for building modern web applications with real-time database functionality and authentication.

### Key Principles
- **TypeScript-first** development
- **Component-based** architecture
- **Real-time data** with InstantDB
- **Responsive design** with Tailwind CSS
- **Visual regression testing** with Playwright

## 🏗️ Architecture Decisions

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

## 🧪 Testing Strategy

### Playwright Visual Testing
- **Purpose**: Test UI and user flows, validate responsive design
- **Key Commands**:
  ```bash
  npm run dev  # Start server (usually localhost:3000)
  npm run test # Run all tests
  npm run test:visual # Run responsive design tests
  ```
- **Browser**: Firefox (ARM64 compatible)
- **Coverage**: Desktop/tablet/mobile responsive testing

## 📁 Key Files & Responsibilities

### Core Components
- **`App.tsx`**: Main app, routing, auth provider wrapper
- **`AuthProvider.tsx`**: Authentication context and state management
- **`Header.tsx`**: Navigation, user profile, sign in/out
- **`HomePage.tsx`**: Landing page component
- **`AboutPage.tsx`**: About/story page

### Data & Configuration  
- **`lib/instant.ts`**: InstantDB setup, TypeScript schemas
- **`lib/schema.ts`**: Database schema definition and TypeScript types
- **`tailwind.config.js`**: Tailwind CSS configuration

### Testing
- **`tests/basic.spec.ts`**: Core functionality tests
- **`tests/visual-regression.spec.ts`**: Responsive design tests
- **`playwright.config.ts`**: Playwright configuration

## 🔧 Development Commands

### Essential Commands
```bash
npm run dev          # Start development server
npm run build        # Check TypeScript errors and build
npm run lint         # Check code quality with ESLint
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run test         # Run Playwright tests
npm run test:visual  # Run responsive design tests
```

### Code Quality Tools
- **ESLint**: Code linting with TypeScript and React rules
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict mode enabled for type safety

## 🎨 Design System

### Color Palette
- **Neutral**: Grays for text, whites for cards, subtle backgrounds
- **Primary**: Blue accent colors for CTAs and links
- **Semantic**: Success (green), warning (yellow), error (red)

### Layout Patterns
- **Responsive**: Mobile-first design approach
- **Card-based**: Rounded corners, shadows, hover effects
- **Grid layouts**: Flexible grid systems with Tailwind

### Typography
- **Headers**: Bold, proper hierarchy (h1, h2, h3)
- **Body**: Clean sans-serif, good contrast
- **Interactive**: Proper hover states, transitions

## 🔄 Template Customization

### Setup Process
1. Run `node setup-template.js` to configure project
2. Replace template variables with actual values
3. Update schema in `src/lib/schema.ts` for data model
4. Customize components for specific use case

### Key Variables
- `{{PROJECT_NAME}}` - Package name (kebab-case)
- `{{PROJECT_TITLE}}` - Display title
- `{{PROJECT_DESCRIPTION}}` - Description
- `{{INSTANTDB_APP_ID}}` - Your InstantDB app ID

## 🔐 Authentication Patterns

```typescript
// Real InstantDB auth usage
const { user, isLoading } = db.useAuth()
await db.auth.sendMagicCode({ email })
```

## 📊 Database Schema

### Template Schema Structure
```typescript
type Schema = {
  $users: { id, email }
  profiles: { id, displayName, createdAt, updatedAt }
  // Add your entities here
  posts: { id, title, content, published, createdAt }
  comments: { id, content, createdAt, updatedAt }
  favorites: { id, entityId, profileId }
}
```

### Extending the Schema
- Add new entities in `src/lib/schema.ts`
- Define relationships with links
- Update TypeScript types accordingly
- Run schema migrations as needed

## 🎯 Testing Guidelines

### Before Making Changes
1. **Run existing tests** to ensure baseline functionality
2. **Take screenshots** with Playwright for visual regression
3. **Check TypeScript** with `npm run build`

### After Changes
1. **Visual testing**: `npm run test:visual` for responsive design
2. **Functionality testing**: `npm run test` for basic flows
3. **Build verification**: Ensure TypeScript compilation succeeds

### Writing New Tests
- Add functionality tests to `tests/basic.spec.ts`
- Add visual tests to `tests/visual-regression.spec.ts`
- Use descriptive test names and clear assertions
- Take screenshots for visual verification

## 💡 Development Tips

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

### ⚠️ ALWAYS TEST WITH PLAYWRIGHT

**MANDATORY**: Before and after ANY significant changes:

1. **Test functionality**: `npm run test`
2. **Test responsive design**: `npm run test:visual`  
3. **Take screenshots**: Document current vs expected state
4. **Verify builds**: `npm run build` must succeed

### Essential Testing Pattern
```bash
# Before changes
npm run test:visual

# Make changes...

# After changes  
npm run test:visual
npm run build
```

## 🔧 Customization Checklist

When adapting this template:

- [ ] Run `setup-template.js` for initial configuration
- [ ] Update `src/lib/schema.ts` with your data model
- [ ] Customize `HomePage.tsx` and `AboutPage.tsx` content
- [ ] Update branding and styling in components
- [ ] Add your specific business logic and features
- [ ] Update tests to match your application flow
- [ ] Configure deployment environment variables
- [ ] Test authentication flow with your InstantDB app

## 📚 Resources

- **InstantDB**: [Documentation](https://instantdb.com/docs) for real-time database
- **React**: [Documentation](https://react.dev) for component development  
- **Tailwind**: [Documentation](https://tailwindcss.com/docs) for styling
- **Playwright**: [Documentation](https://playwright.dev) for testing

## ⚠️ Important Notes

- Template variables (`{{VARIABLE}}`) must be replaced during setup
- InstantDB App ID is required for authentication to work
- Firefox browser is used for testing (ARM64 compatible)
- Environment variables should be configured for deployment
- Schema changes may require database migrations

This template provides a solid foundation for modern React applications with real-time capabilities!