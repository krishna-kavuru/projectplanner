const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  documentName: { type: String, required: true },
  documentType: { type: String, required: true },
  documentDate: { type: Date, required: true },
  file: { type: String, required: true } // Assuming you're storing file paths
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
