const { Schema, model } = require('mongoose');

const {
  Types: { ObjectId },
} = Schema;

const videoSchema = new Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: ObjectId,
      ref: 'Story',
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = model('Video', videoSchema);
