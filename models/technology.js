const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
  label: { type: String, required: true }
});

module.exports = mongoose.model('Technology', TechnologySchema);
