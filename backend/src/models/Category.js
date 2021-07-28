const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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

categorySchema.plugin(uniqueValidator);

module.exports = model('Category', categorySchema);
