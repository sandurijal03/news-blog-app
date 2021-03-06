const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const {
  Types: { ObjectId },
} = Schema;

const storySchema = new Schema(
  {
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

storySchema.plugin(uniqueValidator);

module.exports = model('Story', storySchema);
