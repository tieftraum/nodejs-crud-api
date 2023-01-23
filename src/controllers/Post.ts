import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post";

const readSingle = (req: Request, res: Response, next: NextFunction) => {
  const title = req.params.title;
  return Post.find({ title: { $regex: title, $options: "i" } })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Post.find()
    .sort({ createDate: -1 })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

const searchByTag = (req: Request, res: Response, next: NextFunction) => {
  const tags = req.params.tag.split(",");

  return Post.find({ tags: { $in: tags } })
    .sort({ createDate: -1 })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

const search = (req: Request, res: Response, next: NextFunction) => {
  const searchKey = req.params.searchKey;

  return Post.find({ $text: { $search: searchKey } })
    .sort({ createDate: -1 })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

const createPost = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    ...payload,
  });
  return post
    .save()
    .then((post) => res.status(201).json({ post }))
    .catch((error) => res.status(500).json({ error }));
};

const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  return Post.findByIdAndUpdate(postId, req.body, {
    new: true,
    runValidators: true,
  })
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ message: `Post with ID ${postId} was not found.` });
      }
      return res.status(204).json({});
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  return Post.findByIdAndDelete(postId)
    .then((post) =>
      post
        ? res.status(202).json({ post, message: "Deleted" })
        : res
            .status(404)
            .json({ message: `Post with ID ${postId} was not found.` })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  readSingle,
  readAll,
  searchByTag,
  search,
  createPost,
  updatePost,
  deletePost,
};
