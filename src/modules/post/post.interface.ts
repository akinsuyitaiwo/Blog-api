import { Types } from "mongoose";

export interface CreatePostDTO {
  title: string;
  content: string;
  status?: "draft" | "published";
  tags?: string[];
  author: string;
}

export interface UpdatePostDTO {
  postId: Types.ObjectId;
  userId: string;
  title?: string;
  content?: string;
  status?: "draft" | "published";
  tags?: string[];
}

export interface DeletePostDTO {
  postId: Types.ObjectId;
  userId: string;
}

export interface GetPostsDTO {
  page: number;
  limit: number;
  search?: string;
  tag?: string;
  author?: string;
  status?: "draft" | "published";
  userId?: string;
}