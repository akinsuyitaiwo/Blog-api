import { Request, Response } from "express";
import PostModel from "../../models/post-model";
import {
  badReqResponse,
  createdResponse,
  errorResponse,
} from "../../utils/response-util";
import { generateUniqueSlug } from "../../utils/generateSlug";
import { CreatePostDTO, DeletePostDTO, GetPostsDTO, UpdatePostDTO } from "./post.interface";

export const createPost = async (data: CreatePostDTO) => {
  try {

    const { title, content, status, tags } = data;

    const slug = await generateUniqueSlug(title);

    const post = await PostModel.create({
      title,
      content,
      status,
      tags,
      slug,
      author: data.author,
    });
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

export const getPosts = async ({
  page,
  limit,
  search,
  tag,
  author,
  status,
  userId,
}: GetPostsDTO) => {
  const skip = (page - 1) * limit;

  const filter: any = {
    deletedAt: null,
  };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (tag) {
    filter.tags = tag;
  }

  if (author) {
    filter.author = author;
  }

  if (!userId) {
    filter.status = "published";
  } else if (status === "draft") {
    filter.status = "draft";
    filter.author = userId;
  } else if (status === "published") {
    filter.status = "published";
  } else {
    filter.$or = [{ status: "published" }, { status: "draft", author: userId }];
  }

  const [posts, totalCount] = await Promise.all([
    PostModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email"),
    PostModel.countDocuments(filter),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    },
  };
};

export const getPostBySlug = async (slug: string, userId?: string) => {
  const post = await PostModel.findOne({
    slug,
    deletedAt: null,
  }).populate("author", "name email");

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.status === "published") {
    return post;
  }

  if (!userId || post.author._id.toString() !== userId) {
    throw new Error("Not authorized");
  }

  return post;
};


export const updatePost = async ({
  postId,
  userId,
  title,
  content,
  status,
  tags,
}: UpdatePostDTO) => {
  const post = await PostModel.findOne({
    _id: postId,
    author: userId,
    deletedAt: null,
  });
  if (!post) {
    throw new Error("Post not found or not authorized");
  }

  if (title && title !== post.title) {
    post.title = title;
    post.slug = await generateUniqueSlug(title);
  }

  if (content) post.content = content;
  if (status) post.status = status;
  if (tags) post.tags = tags;

  await post.save();

  return post;
};

export const deletePost = async ({ postId, userId }: DeletePostDTO) => {
  const post = await PostModel.findOne({
    _id: postId,
    author: userId,
    deletedAt: null,
  });

  if (!post) {
    throw new Error("Post not found or not authorized");
  }

  post.deletedAt = new Date();
  await post.save();

  return post;
};