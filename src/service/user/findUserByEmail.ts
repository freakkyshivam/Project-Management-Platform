import { eq } from 'drizzle-orm'
import db from '../../db/db.js'
import Users from '../../db/schema/user.schema.js'


export const findUserByEmail = async (email :string)=>{
        if(!email){
            throw new Error("Email id is required")
        }
        const [user]= await db
        .select({
             id : Users.id,
             role : Users.role,
             accountStatus : Users.accountStatus
        }).
        from(Users).
        where( eq(Users.email, email))
        .limit(1);
        return user ?? null;
     
}