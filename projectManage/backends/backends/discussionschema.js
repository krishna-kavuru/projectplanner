// ./models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  projectName: String,
  text: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
