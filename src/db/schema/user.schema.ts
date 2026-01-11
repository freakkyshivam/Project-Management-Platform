import { pgTable, uuid,timestamp,varchar } from "drizzle-orm/pg-core";
 import { pgEnum } from "drizzle-orm/pg-core";
 export const userRoleEnum = pgEnum("user_role", [
   "admin",
   "project_admin",
   "member",
 ]);

 export const accountStatusEnum = pgEnum("account_status", [
  "active",
  "suspended",
  "blocked",
]);
 
export const usersTable = pgTable("users", {
  id: uuid("user_id").primaryKey(),  

 username: varchar("username", { length: 50 }).unique().notNull(),

 email : varchar("email",{length:80}).unique().notNull(),

  role: userRoleEnum("role").notNull(),

  accountStatus: accountStatusEnum("account_status")
    .notNull()
    .default("active"),

 createdAt: timestamp("created_at",{ withTimezone: true }).notNull().defaultNow(),
updatedAt: timestamp("updated_at",{ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),

},
  
);

export default usersTable;
