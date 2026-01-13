import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";

export const healthCheck = asyncHandler(
  async (_req: Request, res: Response) => {
    res.status(200).json(
       {
        msg : "Server is running"
       }
    );
  }
);
