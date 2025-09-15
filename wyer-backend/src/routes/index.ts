import { Elysia } from 'elysia';
import { db } from '../db/client';
import { users } from '../db/schema';
import { auth } from '../auth';
import { hasPermission } from '../auth/permissionCheck';
import { cors } from '@elysiajs/cors';
import { eq } from 'drizzle-orm';

export const app = new Elysia()
  .use(cors({ origin: ['http://localhost:3001', 'space for frontend domain'] }))
  .use(auth.elysia())
  .get('/users', async ({ user }) => {
    if (!user) {
      throw new Error('Unauthorized');
    }
    const canViewUsers = await hasPermission(user.id, user.tenantId, 'view:users');
    if (!canViewUsers) {
      throw new Error('Forbidden: Insufficient permissions');
    }
    // Import 'eq' from your query builder library, e.g., import { eq } from 'drizzle-orm'
    return await db.select().from(users).where(eq(users.tenantId, user.tenantId));
  })
  .post('/auth/otp', async ({ body }) => {
    const { email } = body as { email: string };
    const result = await auth.api.signInWithOtp({ email });
    return { message: 'OTP sent to email', result };
  })
  .post('/auth/verify-otp', async ({ body }) => {
    const { email, otp } = body as { email: string; otp: string };
    const result = await auth.api.verifyOtp({ email, otp });
    return { message: 'OTP verified', session: result.session };
  });