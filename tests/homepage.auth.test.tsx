import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the AuthProvider module used by HomePage to control auth state
type MockAuth = {
  user: { id: string; email: string } | null;
  profile: unknown | null;
  isLoading: boolean;
  signInWithEmail: (email: string) => Promise<void> | void;
  verifyCode: (email: string, code: string) => Promise<void> | void;
  signOut: () => void;
  showDisplayNameModal: boolean;
  setDisplayNameAndCloseModal: (name: string) => void;
};

const authState: MockAuth = {
  user: null,
  profile: null,
  isLoading: false,
  signInWithEmail: vi.fn(),
  verifyCode: vi.fn(),
  signOut: vi.fn(),
  showDisplayNameModal: false,
  setDisplayNameAndCloseModal: vi.fn(),
};

vi.mock('../src/components/AuthProvider', () => ({
  useAuth: () => authState,
}));

import { HomePage } from '../src/components/HomePage';

describe('HomePage auth-based rendering', () => {
  beforeEach(() => {
    // reset to logged-out before each test
    authState.user = null;
  });

  it('shows sign-up CTA when logged out', async () => {
    render(<HomePage onPageChange={() => {}} />);

    // Button label depends on auth state
    expect(
      screen.getByRole('button', { name: /get started free/i })
    ).toBeInTheDocument();

    // One or more Sign In buttons are visible for logged-out users
    const signInButtons = screen.getAllByRole('button', { name: /sign in/i });
    expect(signInButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('shows app CTA when logged in', async () => {
    authState.user = { id: 'user_123', email: 'test@example.com' };

    render(<HomePage onPageChange={() => {}} />);

    // Main CTA switches to "Go to App"
    expect(
      screen.getByRole('button', { name: /go to app/i })
    ).toBeInTheDocument();

    // Example focuses on primary CTA changing when logged in
  });
});
