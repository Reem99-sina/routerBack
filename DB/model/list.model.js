const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
// const cryptojs = require("crypto-js")
var subSchema = mongoose.Schema({ 
    body:String,
},{ _id : false });
const listtaskSchema = mongoose.Schema({
    tasks: [{
        type:subSchema
    }],
    isShare: { type: Boolean, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true })
listtaskSchema.plugin(mongoosePaginate);
const listtaskModel = mongoose.model("list", listtaskSchema)
module.exports = listtaskModel