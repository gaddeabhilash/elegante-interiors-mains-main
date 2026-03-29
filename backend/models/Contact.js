const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
  },
  bhkType: {
    type: String,
  },
  services: {
    type: [String],
    default: [],
  },
  details: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
