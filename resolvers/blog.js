const Blog = require('../models/blog');

const transformBlogs = blog => {
  return { ...blog._doc, _id: blog.id };
};

const blogs = async () => {
  try {
    const blogs = await Blog.find();
    return blogs.map(blog => transformBlogs(blog));
  } catch (err) {
    throw new Error(err);
  }
};

const singleBlog = async args => {
  try {
    const blog = await Blog.findById(args.blogId);
    if (!blog) {
      throw new Error('Blog not found!');
    }
    return transformBlogs(blog);
  } catch (err) {
    throw new Error(err);
  }
};

const createBlog = async args => {
  const blog = new Blog({
    title: args.blogInput.title,
    body: args.blogInput.body,
    hidden: args.blogInput.hidden
  });
  let createdBlog;
  try {
    const result = await blog.save();
    createdBlog = transformBlogs(result);
    return createdBlog;
  } catch (err) {
    throw new Error(err);
  }
};

const removeBlog = async args => {
  const deletedBlog = await Blog.findByIdAndDelete(args.blogId);
  if (!deletedBlog) {
    throw new Error('Blog not found!');
  }
  return transformBlogs(deletedBlog);
};

module.exports = { blogs, singleBlog, createBlog, removeBlog };
