const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  shortId: {
    type: String,
    require: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    require: true,
  },
  visitHistory: [{
    timestamp: {
      type: Number
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, {
  timestamps: true
}, );

const URL = mongoose.model("URL", URLSchema);
module.exports = URL;