
const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
// const cryptojs = require("crypto-js")
const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'list' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

}, { timestamps: true })
categorySchema.plugin(mongoosePaginate);
const categoryModel = mongoose.model("category", categorySchema)
module.exports = categoryModel