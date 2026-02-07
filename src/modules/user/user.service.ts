import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "../../models/user-model";
import {
  badReqResponse,
  createdResponse,
  errorResponse,
  successResponse,
} from "../../utils/response-util";
import JWTService from "../../services/jwt-service";

const jwtService = new JWTService();
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return badReqResponse(res, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return createdResponse(res, "User created");
  } catch (error) {
    return errorResponse(res, "Internal Server Error");
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return badReqResponse(res, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return badReqResponse(res, "Invalid email or password");
    }

        const accessToken = jwtService.createAccessToken({
          userId: user._id.toString(),
          email: user.email,
        
        });

        const refreshToken = jwtService.createRefreshToken({
          userId: user._id.toString(),
          email: user.email,
        });
    return successResponse(res, "User signed in", {
      userId: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return errorResponse(res, "Internal Server Error");
  }
}