const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    projectName: String,
    name: String,
    role: String,
    email: String,
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;