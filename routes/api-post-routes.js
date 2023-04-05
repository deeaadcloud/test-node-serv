const express = require("express");
const {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
} = require("../controller/api-post-controller");
const router = express.Router();


//get all Posts
router.get("/api/posts", getPosts);

//get Post
router.get("/api/posts/:id", getPost);

//add new Posts
router.post("/api/add-post", addPost);

//delete Post
router.delete("/api/posts/:id", deletePost);

//edit Post
router.put("/api/edit/:id", editPost);



module.exports = router;
