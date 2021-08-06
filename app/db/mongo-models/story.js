const mongoose = require('mongoose');

const StorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: Date.now(),
  tags: { type: String },
  title: { type: String },
  textCover: { type: String },
  imageCover: { type: String },
  story: { type: String },
  storySettings: {
    font: { type: String },
    textBackground: { type: String },
    background: { type: String },
  },
  coverSettings: {
    font: { type: String },
    background: { type: String },
    titleFont: { type: String },
    titleBackground: { type: String },
  },
});

const Story = mongoose.model('Story', StorySchema);

module.exports = User;
