import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { tenants, users, teams, roles, groups, userGroups, groupRoles } from './schema';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seed() {
  // Insert tenants
  const [tenant1, tenant2] = await db
    .insert(tenants)
    .values([{ name: 'Tenant 1' }, { name: 'Tenant 2' }])
    .returning();

  // Insert users
  const [user1, user2] = await db
    .insert(users)
    .values([
      { email: 'user1@example.com', tenantId: tenant1.id, isVerified: true },
      { email: 'user2@example.com', tenantId: tenant2.id, isVerified: true },
    ])
    .returning();

  // Insert teams
  const [team1, team2] = await db
    .insert(teams)
    .values([
      { name: 'Team A', tenantId: tenant1.id },
      { name: 'Team B', tenantId: tenant2.id },
    ])
    .returning();

  // Insert roles
  const [role1, role2] = await db
    .insert(roles)
    .values([
      { name: 'Admin', permissions: ['view:users', 'edit:users'], tenantId: tenant1.id },
      { name: 'Viewer', permissions: ['view:users'], tenantId: tenant2.id },
    ])
    .returning();

  // Insert groups
  const [group1, group2] = await db
    .insert(groups)
    .values([
      { name: 'Admins', teamId: team1.id },
      { name: 'Viewers', teamId: team2.id },
    ])
    .returning();

  // Link users to groups
  await db.insert(userGroups).values([
    { userId: user1.id, groupId: group1.id },
    { userId: user2.id, groupId: group2.id },
  ]);

  // Link groups to roles
  await db.insert(groupRoles).values([
    { groupId: group1.id, roleId: role1.id },
    { groupId: group2.id, roleId: role2.id },
  ]);

  console.log('Database seeded');
}

seed().then(() => process.exit());