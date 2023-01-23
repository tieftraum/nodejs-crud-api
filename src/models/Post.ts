import mongoose, { Document, Schema } from "mongoose";

export interface IPost {
  description: string;
  image: string;
  title: string;
  tags: string[];
  createDate: Date;
  userId: string; //MOCK
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 3000,
    },
    image: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /\.(jpe?g|png)$/i.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid file extension!`,
      },
    },
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    tags: { type: Array<String> },
    createDate: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IPost>("Post", PostSchema);
