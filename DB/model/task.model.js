const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
// const cryptojs = require("crypto-js")
const taskSchema = mongoose.Schema(
  {
    body: { type: String, required: true },
    isShare: { type: Boolean, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);
taskSchema.plugin(mongoosePaginate);
const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
