import mongoose, { Schema, Types } from "mongoose";

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  status: "draft" | "published" ;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    tags: {
      type: [String],
      default: [],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ title: "text", content: "text" });
PostSchema.index({ status: 1 });
PostSchema.index({ tags: 1 });
const PostModel = mongoose.model<IPost>("Post", PostSchema);
export default PostModel;