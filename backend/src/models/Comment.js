const { Schema, model } = require('mongoose');

const {
  Types: { ObjectId },
} = Schema;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    story: {
      type: ObjectId,
      ref: 'Story',
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = model('Comment', commentSchema);
