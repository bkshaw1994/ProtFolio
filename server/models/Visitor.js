const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    totalVisits: {
      type: Number,
      default: 0
    },
    uniqueVisitors: {
      type: Number,
      default: 0
    },
    lastVisit: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Visitor', visitorSchema);
