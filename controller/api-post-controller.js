const Post = require("../models/post");

const handleError = (req, error) => {
  req.status(500).send(error);
};

const getPost = (res, req) => {
  Post.findById(res.params.id)
    .then((post) => req.status(200).json(post))
    .catch((error) => handleError(req, error));
};
const getPosts = (res, req) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => req.status(200).json(posts))
    .catch((error) => handleError(req, error));
};

const deletePost = (res, req) => {
  Post.findByIdAndDelete(id)
    .then((post) => req.status(200).json(id))
    .catch((error) => handleError(req, error));
};

const editPost = (res, req) => {
  const { title, text, author } = res.body;
  const { id } = res.params;
  Post.findByIdAndUpdate(id, { title, text, author })
    .then((post) => req.status(200).json(post))
    .catch((error) => handleError(req, error));
};

const addPost = (res, req) => {
  const { title, text, author } = res.body;
  const post = new Post({ title, text, author });
  post
    .save()
    .then((post) => req.status(200).json(post))
    .catch((error) => handleError(req, error));
};

module.exports = {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
};
