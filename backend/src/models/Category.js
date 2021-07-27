const { Schema, model } = require('mongoose');

const {
  Types: { ObjectId },
} = Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Category = model('Category', categorySchema);

module.exports = Category;
