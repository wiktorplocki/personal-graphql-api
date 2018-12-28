const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String },
  description: { type: String },
  technologies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technology'
    }
  ]
});

module.exports = mongoose.model('Project', ProjectSchema);
