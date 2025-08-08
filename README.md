# React + InstantDB Template

A production-ready React template with InstantDB integration, authentication, responsive design, and comprehensive testing setup.

## 🚀 Quick Start

### 1. Setup Template
```bash
git clone git@github.com:alexpricedev/react-instantdb-template.git my-new-project
cd my-new-project
node setup-template.js
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Push InstantDB Schema & Perms
- Ensure `.env` contains your `VITE_INSTANTDB_APP_ID`.
- Using Instant CLI:
  - Push schema: `npx instant-cli@latest push schema`
  - Push permissions: `npx instant-cli@latest push perms`
  - Alternatively: use the Instant MCP to manage schema and rules.

### 4. Start Development
```bash
pnpm run dev
```

## ✨ Features

### 🔧 Core Stack
- **React 18** with TypeScript
- **InstantDB** for real-time database and authentication
- **Tailwind CSS** for styling
- **Vite** for fast development and building

### 🔐 Authentication
- Magic link authentication via InstantDB
- User profiles and sessions
- Protected routes and conditional rendering

### 🎨 UI Components
- Responsive design (mobile-first)
- Toast notifications
- Modal dialogs
- Form components
- Loading states

### 🧪 Testing
- **Vitest** unit and integration tests

### 🛠️ Development Tools
- **ESLint** + **Prettier** for code quality
- **TypeScript** strict mode
- Hot module replacement
- Build optimization

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthProvider.tsx # Authentication context
│   ├── Header.tsx       # Navigation component
│   ├── HomePage.tsx     # Landing page
│   ├── AboutPage.tsx    # About page
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuthWithProfile.ts
│   └── ...
├── lib/                # Core utilities
│   └── instant.ts      # InstantDB configuration
├── instant.schema.ts   # Database schema and types (project root)
└── main.tsx            # App entry point

tests/                 # Vitest tests
└── schema.test.ts     # Example test
```

## 🗄️ Database Schema

The template includes a flexible schema with:

- **Users** - Authentication and user data
- **Profiles** - User display information
- **Content entities** - Customizable for your app
- **Comments** - User-generated content
- **Favorites** - User preferences

### Customizing the Schema

Edit `instant.schema.ts` (project root) to define your data model:

```typescript
export const schema = i.schema({
  entities: {
    // Add your entities here
    posts: i.entity({
      title: i.string(),
      content: i.string(),
      published: i.boolean(),
      createdAt: i.number(),
    }),
  },
  links: {
    // Define relationships
    postAuthor: {
      forward: { on: 'posts', has: 'one', label: 'author' },
      reverse: { on: 'profiles', has: 'many', label: 'posts' },
    },
  },
});
```

## 🎨 Styling System

### Tailwind CSS
- Utility-first CSS framework
- Responsive design utilities
- Dark mode support (configurable)
- Custom color palette

### Design Patterns
- **Mobile-first** responsive design
- **Card-based** layouts
- **Consistent spacing** with Tailwind scale
- **Accessible** color contrasts

## 🔐 Authentication Flow

1. **Login Modal** - Email input for magic link
2. **Magic Code** - 6-digit verification code
3. **Profile Setup** - Display name and preferences
4. **Session Management** - Persistent login state

### Usage in Components
```typescript
import { db } from '../lib/instant';

function MyComponent() {
  const { user, isLoading } = db.useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <LoginModal />;
  
  return <div>Welcome, {user.email}!</div>;
}
```

## 🧪 Testing

### Commands
```bash
pnpm run test          # Run all tests (Vitest)
```

### Test Types
- **Unit and integration** - Components and utilities

### Writing Tests
```typescript
test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/My App/);
  await page.screenshot({ path: 'homepage.png' });
});
```

## 🚀 Deployment

### Prepare for Production
```bash
pnpm run build    # Build production bundle
pnpm run preview  # Preview production build
```

### Environment Variables
Create `.env.production`:
```bash
VITE_INSTANTDB_APP_ID=your-production-app-id
```

### Platform Support
- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **Railway** - Full-stack hosting
- **Any static host** - Built files in `dist/`

## 📋 Development Workflow

### 1. Code Quality
```bash
pnpm run lint        # Check code issues
pnpm run lint:fix    # Auto-fix issues
pnpm run format      # Format with Prettier
```

### 2. Type Safety
- TypeScript strict mode enabled
- Database schema types auto-generated
- Component prop validation

### 3. Testing Strategy
- Write tests for new components
- Run visual regression tests before commits
- Update screenshots when UI changes

## 🔧 Configuration

### InstantDB
- App ID in `.env` file
- Schema definition in `instant.schema.ts` (project root)
- Real-time queries and mutations

### Tailwind CSS
- Configuration in `tailwind.config.js`
- Custom colors and utilities
- Responsive breakpoints

### Vitest
- Zero-config test runner
- JSDOM or Node environments
- Fast watch mode

## 🎯 Customization Guide

### 1. Replace Template Content
- Update `HomePage.tsx` with your landing page
- Modify `AboutPage.tsx` with your story
- Customize `Header.tsx` navigation

### 2. Add Your Features
- Create new components in `src/components/`
- Add routes in `App.tsx`
- Define data queries with InstantDB hooks

### 3. Style Your App
- Update color scheme in `tailwind.config.js`
- Add custom components styles
- Implement your design system

### 4. Configure Database
- Update schema for your data model
- Add necessary relationships
- Create seed data in `scripts/seed.js`

## 🆘 Troubleshooting

### Common Issues

**Authentication not working?**
- Check InstantDB App ID in `.env`
- Verify app exists in InstantDB dashboard
- Ensure schema is properly deployed

**Tests failing?**
- Ensure dependencies are installed: `pnpm install`
- Run tests with verbose output: `pnpm run test -- --reporter=verbose`

**Build errors?**
- Check TypeScript errors: `pnpm run build`
- Verify all imports are correct
- Ensure environment variables are set

## 📚 Resources

- [InstantDB Documentation](https://instantdb.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

MIT License - feel free to use for any project!

---

## 🤝 Contributing

This template is designed to be a starting point. Feel free to:

1. Fork and customize for your needs
2. Submit improvements via pull requests
3. Report issues or suggest features
4. Share your projects built with this template

Happy building! 🚀
