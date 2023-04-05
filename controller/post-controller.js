const Post = require("../models/post");
const createPath = require("../helpers/create-path");

const handleError = (req, error) => {
  console.log(error);
  req.render(createPath("error"), { title: "Error" });
};

const getPost = (res, req) => {
  const title = "Post";
  Post.findById(res.params.id)
    .then((post) => req.render(createPath("post"), { post, title }))
    .catch((error) => handleError(res, error));
};
const getPosts = (res, req) => {
  const title = "Posts";
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => req.render(createPath("posts"), { posts, title }))
    .catch((error) => handleError(res, error));
};

const deletePost = (res, req) => {
  const title = "Post";
  Post.findByIdAndDelete(res.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => handleError(req, error));
};

const getEditPost = (res, req) => {
  const title = "Post";
  Post.findById(res.params.id)
    .then((post) => req.render(createPath("edit-post"), { post, title }))
    .catch((error) => handleError(req, error));
};
const editPost = (res, req) => {
  const { title, text, author } = res.body;
  const { id } = res.params;
  Post.findByIdAndUpdate(id, { title, text, author })
    .then((result) => req.redirect(`/posts/${id}`))
    .catch((error) => handleError(req, error));
};
const getAddPost = (res, req) => {
  const title = "Add Post";
  req.render(createPath("add-post"), { title });
};
const addPost = (res, req) => {
  const { title, text, author } = res.body;
  const post = new Post({ title, text, author });
  post
    .save()
    .then((result) => req.redirect("/posts"))
    .catch((error) => handleError(req, error));
};

module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
};
