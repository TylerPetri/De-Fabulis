const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tag: { type: String },
  count: { type: Number },
});
const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
