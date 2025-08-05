import { init, id } from '@instantdb/react';
import schema from '../../instant.schema';

// App configuration - Replace with your InstantDB App ID in .env
export const APP_ID =
  import.meta.env.VITE_INSTANTDB_APP_ID ||
  (() => {
    throw new Error('VITE_INSTANTDB_APP_ID environment variable is required');
  })();

export const db = init({
  appId: APP_ID,
  schema,
});

// Re-export utilities
export { id };
