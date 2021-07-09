const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      maxlength: 15,
      lowercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      maxlength: 15,
      lowercase: true,
    },
    email: {
      type: String,
      validate: [isEmail],
      required: true,
      lowercase: true,
      trim: true,
    },
    tel: {
      type: String,
      maxLength: 13,
    },
  },
  {
    timestamps: true,
  }
);

const BusinessCardModel = mongoose.model("businessCard", userSchema);

module.exports = BusinessCardModel;