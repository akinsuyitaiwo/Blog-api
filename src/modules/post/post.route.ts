import { Router } from "express";
import {
  createPostController,
  getPostsController,
  getPostBySlugController,
  updatePostController,
  deletePostController,
} from "./post.controller";
import { validate } from "../../middleware/validate";
import { createPostSchema, getPostsQuerySchema, updatePostSchema } from "./post.validation";
import authHandler from "../../middleware/auth-handler";
const postRouter = Router();

postRouter.post(
  "/",
  authHandler,
  validate(createPostSchema),
  createPostController
);
postRouter.get("/", validate(getPostsQuerySchema), getPostsController);
postRouter.get("/:slug", getPostBySlugController);
postRouter.put(
  "/:id",
  authHandler,
  validate(updatePostSchema),
  updatePostController
);
postRouter.delete("/:id",authHandler, deletePostController);

export default postRouter;