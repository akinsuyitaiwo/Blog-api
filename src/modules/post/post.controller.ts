import { Request, Response } from "express";
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost,
} from "./post.service";
import { badReqResponse, createdResponse, errorResponse, successResponse } from "../../utils/response-util";
import { Types } from "mongoose";

export const createPostController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return badReqResponse(res, "User not authenticated");
    }

    const { title, content, status, tags } = req.body;

    const post = await createPost({
      title,
      content,
      status,
      tags,
      author: req.user.userId,
    });

    return createdResponse(res, "Post created successfully", post);
  } catch (error: any) {
    console.error("Error creating post:", error);

    return errorResponse(res, "Internal Server Error");
  }
};

export const getPostsController = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", search, tag, author, status } = req.query;

    const result = await getPosts({
      page: Math.max(Number(page), 1),
      limit: Math.min(Number(limit), 50),
      search: search as string,
      tag: tag as string,
      author: author as string,
      status: status as "draft" | "published",
      userId: req.user?.userId,
    });

    return successResponse(res, "Posts retrieved", result);
  } catch (error) {
    return errorResponse(res, "Internal Server Error");
  }
};

export const getPostBySlugController = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (typeof slug !== "string") {
      return badReqResponse(res, "Invalid slug format");
    }
    const post = await getPostBySlug(slug, req.user?.userId);

    return successResponse(res, "Post retrieved", post);
  } catch (error: any) {
    if (error.message === "Not authorized") {
      return badReqResponse(res, "You are not allowed to view this post");
    }

    return badReqResponse(res, "Post not found");
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return badReqResponse(res, "User not authenticated");
    }
    const { id } = req.params;
    console.log("Updating post with ID:", id);
    const { title, content, status, tags } = req.body;

    const post = await updatePost({
      postId: new Types.ObjectId(id as string),
      userId: req.user.userId,
      title,
      content,
      status,
      tags,
    });

    return successResponse(res, "Post updated successfully", post);
  } catch (error: any) {
    if (error.message.includes("not authorized")) {
      return badReqResponse(res, error.message);
    }

    console.error(error);
    return errorResponse(res, "Internal Server Error");
  }
};


export const deletePostController = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return badReqResponse(res, "User not authenticated");
    }

    const { id } = req.params;

    const post = await deletePost({
      postId: new Types.ObjectId(id as string),
      userId: req.user.userId,
    });

    return successResponse(res, "Post deleted successfully", post);
  } catch (error: any) {
    if (error.message.includes("not authorized")) {
      return badReqResponse(res, error.message);
    }

    console.error(error);
    return errorResponse(res, "Internal Server Error");
  }
};