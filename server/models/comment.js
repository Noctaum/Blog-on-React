var mongoose   = require("mongoose");

let commentSchema = mongoose.Schema({
	author: String,
	text: String,
	date: {type: Date, default: Date.now},
	likes: Number,
});

module.exports = mongoose.model("Comment", commentSchema);