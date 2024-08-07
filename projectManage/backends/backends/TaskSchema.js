// tasksschema.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectName: String,
  taskName: String,
  teamMember: String,
  submissionDate: Date,
  status: { type: String, default: 'pending' } // Default status is 'pending'
});

module.exports = mongoose.model('Task', taskSchema);
