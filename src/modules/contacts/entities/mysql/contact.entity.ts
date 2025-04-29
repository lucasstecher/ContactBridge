import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const contactsTable = mysqlTable('macapa_clients', {
  id: serial().primaryKey(),
  name: varchar({ length: 200 }).notNull(),
  cell_phone: varchar({ length: 20 }).notNull(),
});
