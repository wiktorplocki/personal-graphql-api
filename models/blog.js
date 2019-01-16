const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    hidden: { type: Boolean, default: false, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
