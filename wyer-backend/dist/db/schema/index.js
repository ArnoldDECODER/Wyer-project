import { pgTable, serial, varchar, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
// Tenants
export const tenants = pgTable('tenants', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
});
// Users
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    tenantId: integer('tenant_id').references(() => tenants.id).notNull(),
    teamId: integer('team_id').references(() => teams.id),
    isVerified: boolean('is_verified').default(false),
});
// Teams
export const teams = pgTable('teams', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    tenantId: integer('tenant_id').references(() => tenants.id).notNull(),
});
// Roles
export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    permissions: jsonb('permissions').notNull(), // This part of the code will be used for the "read" and "create" permissions
    tenantId: integer('tenant_id').references(() => tenants.id).notNull(),
});
// Groups
export const groups = pgTable('groups', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    teamId: integer('team_id').references(() => teams.id).notNull(),
});
// Junction Tables
export const userGroups = pgTable('user_groups', {
    userId: integer('user_id').references(() => users.id).notNull(),
    groupId: integer('group_id').references(() => groups.id).notNull(),
});
export const groupRoles = pgTable('group_roles', {
    groupId: integer('group_id').references(() => groups.id).notNull(),
    roleId: integer('role_id').references(() => roles.id).notNull(),
});
