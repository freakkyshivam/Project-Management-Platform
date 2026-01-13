import { eq } from "drizzle-orm";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema/user.schema.js";

export const findUserByEmail = async (email: string) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        role: usersTable.role,
        accountStatus: usersTable.accountStatus,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
 
    return user ?? null;

  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
};
