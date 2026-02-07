import { Router } from "express";
import routeNotFound from "../middleware/not-found";
import userRouter from "../modules/user/user.route";
import postRouter from "../modules/post/post.route";


const router = Router();
router.use('/user', userRouter);
router.use('/post', postRouter);



router.use(routeNotFound);

export default router;
