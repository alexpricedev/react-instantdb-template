# React + InstantDB Template

A production-ready React template with InstantDB integration, authentication, responsive design, and comprehensive testing setup.

## 🚀 Quick Start

### 1. Setup Template
```bash
git clone <this-repo> my-new-project
cd my-new-project
node setup-template.js
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development
```bash
npm run dev
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
- **Playwright** visual regression tests
- Firefox browser support (ARM64 compatible)
- Responsive design testing
- Screenshot generation

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
│   ├── instant.ts      # InstantDB configuration
│   └── schema.ts       # Database schema and types
└── main.tsx           # App entry point

tests/                  # Playwright tests
├── basic.spec.ts      # Functionality tests
└── visual-regression.spec.ts # UI tests
```

## 🗄️ Database Schema

The template includes a flexible schema with:

- **Users** - Authentication and user data
- **Profiles** - User display information
- **Content entities** - Customizable for your app
- **Comments** - User-generated content
- **Favorites** - User preferences

### Customizing the Schema

Edit `src/lib/schema.ts` to define your data model:

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
npm run test          # Run all tests
npm run test:visual   # Responsive design tests
npm run test:headed   # Tests with visible browser
npm run test:report   # View HTML test report
```

### Test Types
- **Basic functionality** - Navigation, forms, auth flow
- **Visual regression** - Screenshot comparison
- **Responsive design** - Mobile/tablet/desktop layouts
- **Cross-browser** - Firefox support (ARM64 compatible)

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
npm run build    # Build production bundle
npm run preview  # Preview production build
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
npm run lint        # Check code issues
npm run lint:fix    # Auto-fix issues
npm run format      # Format with Prettier
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
- Schema definition in `src/lib/schema.ts`
- Real-time queries and mutations

### Tailwind CSS
- Configuration in `tailwind.config.js`
- Custom colors and utilities
- Responsive breakpoints

### Playwright
- Browser configuration in `playwright.config.ts`
- Firefox optimized for ARM64 compatibility
- Screenshot generation and comparison

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
- Install Firefox: `npx playwright install firefox`
- Check if dev server is running: `npm run dev`
- Update screenshots: `npm run test:visual -- --update-snapshots`

**Build errors?**
- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Ensure environment variables are set

## 📚 Resources

- [InstantDB Documentation](https://instantdb.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev)

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