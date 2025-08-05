import { useState } from 'react';
import { useToast } from './ToastProvider';
import { useAuth } from './AuthProvider';
import { db, id } from '../lib/instant';

interface DisplayNameModalProps {
  isOpen: boolean;
  onClose: (handle: string) => void;
  userEmail: string;
}

export function DisplayNameModal({
  isOpen,
  onClose,
  userEmail,
}: DisplayNameModalProps) {
  const [handle, setHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (handle.length < 3) {
      setError('Handle must be at least 3 characters long');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Create or update the user's profile with handle
      if (user) {
        const profileId = id();
        await db.transact([
          db.tx.profiles[profileId].update({
            handle: handle.trim(),
            createdAt: Date.now(),
          }),
          db.tx.profiles[profileId].link({ $user: user.id }),
        ]);
      }

      showToast('Handle saved successfully!', 'success');
      onClose(handle.trim());
    } catch (error: unknown) {
      if (error instanceof Error && error.message?.includes('unique')) {
        setError('This handle is already taken. Please choose another.');
      } else {
        setError(
          `Failed to save handle: ${error instanceof Error ? error.message : 'Please try again.'}`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Choose your handle
          </h2>
          <p className="text-gray-600 text-sm">
            We need a handle to identify you in the app. This will be your
            unique username.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="handle-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Handle *
            </label>
            <input
              id="handle-input"
              type="text"
              value={handle}
              onChange={e => {
                setHandle(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your handle"
              disabled={isSubmitting}
              minLength={3}
              maxLength={30}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            <p className="text-gray-500 text-xs mt-1">
              Minimum 3 characters, must be unique
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Account email:
            </div>
            <div className="text-sm text-gray-600">{userEmail}</div>
          </div>

          <button
            type="submit"
            disabled={handle.length < 3 || isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? 'Saving...' : 'Save Handle'}
          </button>
        </form>
      </div>
    </div>
  );
}
