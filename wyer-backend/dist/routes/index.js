import { Elysia } from 'elysia';
import { db } from '../db/client';
import { users } from '../db/schema';
export const app = new Elysia()
    .get('/users', async () => {
    return await db.select().from(users);
});
