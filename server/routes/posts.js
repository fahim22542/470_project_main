import express from "express";
<<<<<<< HEAD
import { getFeedPosts, getUserPosts, likePost, createPost, commentPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from '../middleware/filemanager.js'


const router = express.Router();

// READ 
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts);
// Post
router.post('/', verifyToken, upload.single('picture'), createPost)
/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);
=======
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
>>>>>>> eb81fc81724ecaae7e2d4f6ae937d31c8bdff1c8

export default router;