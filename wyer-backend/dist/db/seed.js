import { db } from './client';
import { tenants, users, teams, roles, groups, userGroups, groupRoles } from './schema';
async function seed() {
    const [tenant] = await db.insert(tenants).values({ name: 'Acme Corp' }).returning();
    const [team] = await db.insert(teams).values({ name: 'Dev Team', tenantId: tenant.id }).returning();
    const [role] = await db.insert(roles).values({
        name: 'Editor',
        permissions: { vault: ['read', 'create'], financials: ['read'] },
        tenantId: tenant.id,
    }).returning();
    const [group] = await db.insert(groups).values({ name: 'Developers', teamId: team.id }).returning();
    const [user] = await db.insert(users).values({
        email: 'user@example.com',
        tenantId: tenant.id,
        teamId: team.id,
        isVerified: true,
    }).returning();
    await db.insert(userGroups).values({ userId: user.id, groupId: group.id });
    await db.insert(groupRoles).values({ groupId: group.id, roleId: role.id });
    console.log('Seed data inserted');
}
seed().catch(console.error);
