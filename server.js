
const bodyParser     = require('body-parser'),
	  mongoose       = require("mongoose"),
	  express        = require('express'),
	  app            = express();

//let port = process.env.PORT || 8096;
let port = 8096;

mongoose.connect("mongodb://localhost/blogs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let commentSchema = mongoose.Schema({
	author: String,
	text: String,
	date: {type: Date, default: Date.now},
	likes: Number,
});

let Comment = mongoose.model("Comment", commentSchema);

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

let Blog = mongoose.model("Blog", blogSchema);

let blogMetods = {
	showBlog: function(req, res){
		Blog.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else{
				res.json(data);
			}
		});
	},
	addBlog: function(req, res){
		let newPost = req.body;
		if(!newPost.author){
			newPost.author = "unknown";
		}
		newPost.likes = 0;
		
		Blog.create(newPost, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else{
				res.json({answ:true});
			}
		});
	},
	delBlog: function(req, res){
		Blog.findByIdAndRemove(req.params.id, function(err){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else{
				res.json({answ:true});
			}
		});
	},
	changeBlog: function(req, res){
		Blog.findByIdAndUpdate(req.params.id, req.body, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else {
				res.json({answ:true});
			}
		});
	},
	findBlog: function(req, res){
		Blog.findById(req.params.id, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else {
				res.json(data);
			}
		});
	},
};	

let commentMetods = {
	addComment: function(req, res){
		let post = req.body.post;
		let newComment = {
			text: req.body.newComment,
			likes: 0
		}
		if(!req.body.author){
			newComment.author = "unknown";
		}
		Comment.create(newComment, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else {
				Blog.findById(post._id, function(err, newData){
					if(err){
						console.log("ERROR!");
						res.send(err);
					} else {
						newData.comments.unshift(data);
						newData.save(function(err, newNewData){
							if(err){
								console.log("ERROR!");
								res.send(err);
							} else {
								res.json({answ:true});
							}
						});
					}
				});
			}
		});
	},
	findComment: function(req, res){
		Comment.findById(req.params.id, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else {
				res.json(data);
			}
		});
	},
	changeComment: function(req, res){
		Comment.findByIdAndUpdate(req.params.id, req.body, function(err, data){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else {
				res.json({answ:true});
			}
		});
	},
};

app.get('/blog', blogMetods.showBlog);	
app.post('/blog', blogMetods.addBlog);
app.get('/blog/:id', blogMetods.findBlog);
app.delete('/blog/:id', blogMetods.delBlog);
app.put('/blog/:id', blogMetods.changeBlog);

app.post('/blog/comment', commentMetods.addComment);
app.get('/blog/comment/:id', commentMetods.findComment);
app.put('/blog/comment/:id', commentMetods.changeComment);


app.listen(port, function(){
	console.log(`Started on ${port} port!`);
});
