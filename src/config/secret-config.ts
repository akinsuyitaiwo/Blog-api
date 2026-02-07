import { configDotenv } from "dotenv";

configDotenv();

const getStringConfigValue = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} was not set in environment variable`);
  }
  return value;
};

const secret = {
  ORIGIN: getStringConfigValue("ORIGIN"),
  MONGODB_URI: getStringConfigValue("MONGODB_URI"),
  JWT_ACCESS_KEY: getStringConfigValue("JWT_ACCESS_KEY"),
  JWT_REFRESH_KEY: getStringConfigValue("JWT_REFRESH_KEY"),

  NODE_ENV: process.env.NODE_ENV || "development",
};

export default secret;
