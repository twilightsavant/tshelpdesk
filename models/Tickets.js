const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdDate: { type: Date, default: Date.now },
  lastActivity: { type: Date },
  topic: { type: String },
  priority: { type: Number },
  answered: { type: Boolean },
  closed: { type: Boolean },
  assigned: [
    {
      user: { type: mongoose.Schema.Types.ObjectID, ref: 'users' }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      comment: {
        type: String
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  viewedBy: [
    {
      user: { type: mongoose.Schema.Types.ObjectID, ref: 'users' }
    }
  ]
});

module.exports = Tickets = mongoose.model('tickets', TicketsSchema);
