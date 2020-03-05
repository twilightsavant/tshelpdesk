const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarPath: {
    type: String
  },
  date: { type: Date, default: Date.now },
  department: {
    type: String
  },
  position: {
    type: String
  },
  cellphone: {
    type: String
  },
  highfives: {
    type: Object
  },
  notifications: {
    type: Object
  }
});

module.exports = User = mongoose.model('user', UserSchema);
