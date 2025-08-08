import { http, HttpResponse } from 'msw';

// Example handlers to illustrate how Instant auth endpoints could be mocked.
// Adjust paths and payloads to match actual InstantDB HTTP endpoints as needed.
export const handlers = [
  http.post('https://api.instantdb.com/auth/send-magic-code', async () => {
    return HttpResponse.json({ ok: true });
  }),
  http.post(
    'https://api.instantdb.com/auth/sign-in-with-magic-code',
    async () => {
      return HttpResponse.json({
        ok: true,
        user: { id: 'user_123', email: 'test@example.com' },
      });
    }
  ),
];
