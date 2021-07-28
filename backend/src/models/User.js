const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png',
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: Number,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetCode: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.plugin(uniqueValidator);

module.exports = model('User', userSchema);
