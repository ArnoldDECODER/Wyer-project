import { pgTable, serial, varchar, integer, boolean, jsonb, text, timestamp } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  tenantId: integer('tenant_id').references(() => tenants.id).notNull(),
  teamId: integer('team_id').references(() => teams.id),
  isVerified: boolean('is_verified').default(false),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  tenantId: integer('tenant_id').references(() => tenants.id).notNull(),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  permissions: jsonb('permissions').notNull(),
  tenantId: integer('tenant_id').references(() => tenants.id).notNull(),
});

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  teamId: integer('team_id').references(() => teams.id).notNull(),
});

export const userGroups = pgTable('user_groups', {
  userId: integer('user_id').references(() => users.id).notNull(),
  groupId: integer('group_id').references(() => groups.id).notNull(),
});

export const groupRoles = pgTable('group_roles', {
  groupId: integer('group_id').references(() => groups.id).notNull(),
  roleId: integer('role_id').references(() => roles.id).notNull(),
});

// better-auth tables
export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});