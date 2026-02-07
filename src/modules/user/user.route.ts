import { Router } from "express";
import { signupController, signinController } from "./user.controller";
import { validate } from "../../middleware/validate";
import { loginValidation, signInValidation } from "./user.validation";

const userRouter = Router();

userRouter.post("/signup", validate(signInValidation), signupController);
userRouter.post("/signin", validate(loginValidation), signinController);

export default userRouter;