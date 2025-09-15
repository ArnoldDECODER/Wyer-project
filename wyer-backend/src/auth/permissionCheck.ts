import { db } from '../db/client';
import { roles, userGroups, groupRoles } from '../db/schema';
import { eq, and, inArray } from 'drizzle-orm';

export async function hasPermission(userId: number, tenantId: number, permission: string): Promise<boolean> {
  // Get user's groups
  const userGroupRecords = await db
    .select({ groupId: userGroups.groupId })
    .from(userGroups)
    .where(eq(userGroups.userId, userId));

  if (!userGroupRecords.length) return false;

  const groupIds = userGroupRecords.map((record) => record.groupId);

  // Get roles for user's groups
  const groupRoleRecords = await db
    .select({ roleId: groupRoles.roleId })
    .from(groupRoles)
    .where(inArray(groupRoles.groupId, groupIds));

  if (!groupRoleRecords.length) return false;

  const roleIds = groupRoleRecords.map((record) => record.roleId);

  // Check permissions in roles
  const roleRecords = await db
    .select({ permissions: roles.permissions })
    .from(roles)
    .where(and(eq(roles.tenantId, tenantId), inArray(roles.id, roleIds)));

  // Assuming permissions is an array of strings in JSONB
  for (const role of roleRecords) {
    const permissions = role.permissions as string[];
    if (permissions.includes(permission)) {
      return true;
    }
  }

  return false;
}