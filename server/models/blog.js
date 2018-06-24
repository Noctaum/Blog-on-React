var mongoose   = require("mongoose");


let blogSchema = mongoose.Schema({
	author: String,
	title: String,
	img: String,
	text: String,
	date: {type: Date, default: Date.now},
	likes: Number,
	comments : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
});

module.exports = mongoose.model("Blog", blogSchema);