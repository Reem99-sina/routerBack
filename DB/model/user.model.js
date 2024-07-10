const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// const cryptojs = require("crypto-js")
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.saltRound)
  );
  next();
  console.log(this);
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
