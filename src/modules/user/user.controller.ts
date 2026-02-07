import { Request, Response } from "express";
import { signup, signin } from "./user.service";

export const signupController = async (req: Request, res: Response) => {
  await signup(req, res);
};

export const signinController = async (req: Request, res: Response) => {
  await signin(req, res);
}; 