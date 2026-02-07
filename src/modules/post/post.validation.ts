import Joi from "joi";

/** Create Post */
export const createPostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .messages({
      "string.min": "Title must be at least 3 characters",
      "string.empty": "Title is required",
    })
    .required(),

  content: Joi.string()
    .min(10)
    .messages({
      "string.min": "Content must be at least 10 characters",
      "string.empty": "Content is required",
    })
    .required(),

  status: Joi.string().valid("draft", "published").default("draft"),

  tags: Joi.array().items(Joi.string()).optional(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3),
  content: Joi.string().min(10),
  status: Joi.string().valid("draft", "published"),
  tags: Joi.array().items(Joi.string()),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated",
  });

export const getPostsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),

  search: Joi.string().optional(),
  tag: Joi.string().optional(),
  author: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid("draft", "published").optional(),
});
