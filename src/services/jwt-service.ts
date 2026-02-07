import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import secret from "../config/secret-config";

const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = secret;


interface CustomJwtPayload extends DefaultJwtPayload {
  uid: string;
  email: string;
}


class JWTService {
  private refreshKey: string;
  private accessKey: string;

  constructor() {
    this.accessKey = JWT_ACCESS_KEY;
    this.refreshKey = JWT_REFRESH_KEY;
  }

  createAccessToken = (payload: CustomJwtPayload): string => {
    try {
      return jwt.sign(payload, this.accessKey, { expiresIn: "1h" });
    } catch (error) {
      console.error("Error creating access token:", error);
      throw new Error("Failed to create access token");
    }
  };

  createRefreshToken = (payload: CustomJwtPayload): string => {
    try {
      return jwt.sign(payload, this.refreshKey, { expiresIn: "7d" });
    } catch (error) {
      console.error("Error creating refresh token:", error);
      throw new Error("Failed to create refresh token");
    }
  };

  createInviteToken = (payload: CustomJwtPayload): string => {
    try {
      return jwt.sign(payload, this.accessKey, { expiresIn: "7d" });
    } catch (error) {
      console.error("Error creating invite token:", error);
      throw new Error("Failed to create invite token");
    }
  };

  verifyAccessToken = (token: string): CustomJwtPayload | null => {
    try {
      const decoded = jwt.verify(token, this.accessKey) as CustomJwtPayload;
      return decoded;
    } catch (error) {
      console.error("Error verifying access token:", error);
      return null;
    }
  };

  verifyRefreshToken = (token: string): CustomJwtPayload | null => {
    try {
      const decoded = jwt.verify(token, this.refreshKey) as CustomJwtPayload;
      return decoded;
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      return null;
    }
  };

  verifyInviteToken = (token: string): CustomJwtPayload | null => {
    try {
      const decoded = jwt.verify(token, this.accessKey) as CustomJwtPayload;
      return decoded;
    } catch (error) {
      console.error("Error verifying invite token:", error);
      return null;
    }
  };
}

export default JWTService;
