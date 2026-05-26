const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("emailid is not vaild");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male,female,others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "this a default of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, "abc@1234$abc", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  try {
    const user = this;
    console.log(user);
    const comparepassword = await bcrypt.compare(password, user.password);
    return comparepassword;
  } catch (err) {
    console.log(err);
  }
};

const userModal = mongoose.model("users", userSchema);

module.exports = userModal;
