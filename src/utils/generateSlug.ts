import slugify from "slugify";
import PostModel from "../models/post-model";

export const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (await PostModel.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};
