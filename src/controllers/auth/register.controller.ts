import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
 
import { ApiError } from "../../utils/api-error.js";
import { signupValidation, verifySignupValidation } from "../../validators/signup.validator.js";
import axios from "axios";
import { findUserByEmail } from "../../service/user/findUserByEmail.js";
import db from '../../db/db.js'
import { usersTable } from "../../db/schema/user.schema.js";

const BASE_URL = process.env.BASE_URL!;

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = await signupValidation.safeParseAsync(req.body);
 

 if (!validationResult.success) {
  const { fieldErrors, formErrors } = validationResult.error.flatten();

  throw new ApiError(
    422,
    "Validation error",
    {
      fieldErrors,
      formErrors,
    }
  );
}

 const {name, email, password} = validationResult.data;
 
  
 const user = await findUserByEmail(email);
 
 if (user) {
  throw new ApiError(401, `User with this email ${email} already exists`);
}

let data;
try {
    
   
  const response = await axios.post(
    `${BASE_URL}/api/v1/auth/register`,
    {name, email, password },
    { withCredentials: true, timeout: 5000 }
  );
  
  data = response.data;
  if(!data?.success){
    throw new ApiError(400, data?.msg)
  }

} catch (error: any) {
  throw new ApiError(
    error.response?.status || 400,
    error.response?.data?.message || "Signup failed"
  );
}

return res
  .status(200)
  .json({success: true, msg:data?.msg});
});

export const verifyOtp = asyncHandler(async (req:Request, res:Response)=>{
  const validationResult = await verifySignupValidation.safeParseAsync(req.body)
 

  if (!validationResult.success) {
  const { fieldErrors, formErrors } = validationResult.error.flatten();

  throw new ApiError(
    422,
    "Validation error",
    {
      fieldErrors,
      formErrors,
    }
  );
}

const {email, otp,role} =  validationResult.data;

 
try {
  const {data} = await axios.post(
    `${BASE_URL}/api/v1/auth/verify-register-otp`,
    {email, otp },
    { withCredentials: true, timeout: 5000 }
  );
 
   
  console.log(data.user);
  
  if(!data?.success){
    throw new ApiError(400, data?.msg)
  }

 await db.insert(usersTable).values({
  id : data?.user?.id,
  email : email, 
  role: role,
  username : email
})


  return res
  .status(200)
  .json({success:true, msg:data?.msg});
}catch (error: any) {
  if (axios.isAxiosError(error)) {
    throw new ApiError(
      error.response?.status || 400,
      error.response?.data?.message || "Signup failed"
    );
  }

   
  console.error("INTERNAL ERROR:", error);

  throw new ApiError(500, error.message || "Internal server error");
}

})
