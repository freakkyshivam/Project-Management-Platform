import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";
import { loginValidation } from "../../validators/login.validator.js";
import axios from "axios";
import { findUserByEmail } from "../../service/user/findUserByEmail.js";

const BASE_URL = process.env.BASE_URL!;

export const login = asyncHandler(async (req: Request, res: Response) => {
  const validationResult = await loginValidation.safeParseAsync(req.body);

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


 const { email, password } = validationResult.data;

 const user = await findUserByEmail(email);

 if (!user || user.accountStatus === "blocked") {
  throw new ApiError(401, "Invalid email or password");
}

let data;
try {
  const response = await axios.post(
    `${BASE_URL}/api/v1/auth/login`,
    { email, password },
    { withCredentials: true, timeout: 5000 }
  );
  data = response.data;
} catch (error: any) {
  throw new ApiError(
    error.response?.status || 400,
    error.response?.data?.message || "Login failed"
  );
}

return res.status(200).json(data);

});
