import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import response from "../utils/response-util";
import JWTService from "../services/jwt-service";

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header must be in the format: Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify the token
    const jwtService = new JWTService();
    const { verifyAccessToken } = jwtService;
    const decode = verifyAccessToken(token) as JwtPayload & {
      userId: string;
      email: string;
    };

    // const decode = verifyAccessToken(token);
    if (!decode) return response(res, 401, "Invalid access token or expired");
    // Store the decoded JWT in req.user
    // req.user = { userId: decode._id, email: decode.email }; // Map uid to userId to match CustomJwtPayload
    req.user = decode;

    next();
  } catch (error) {
    // console.log(error);
    return response(res, 401, "JWT token Invalid");
  }
};

export default authHandler;
