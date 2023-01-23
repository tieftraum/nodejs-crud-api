import express from "express";
import controller from "../controllers/Post";

const router = express.Router();

router.get("/get/:title", controller.readSingle);
router.get("/get", controller.readAll);
router.get("/by-tag/:tag", controller.searchByTag);
router.get("/search/:searchKey", controller.search);
router.post("/create", controller.createPost);
router.patch("/update/:postId", controller.updatePost);
router.delete("/delete/:postId", controller.deletePost);

export = router;
