
const bodyParser     = require('body-parser'),
	  mongoose       = require("mongoose"),
	  express        = require('express'),
	  app            = express();

//let port = process.env.PORT || 8096;
let port = 8096;

mongoose.connect("mongodb://localhost/blogs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = mongoose.Schema({
	id: Number,
	author: String,
	title: String,
	img: String,
	text: String,
	date: {type: Date, default: Date.now},
	likes: Number,
});

let Blog = mongoose.model("Blog", blogSchema);

let metods = {
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
		Blog.findByIdAndRemove(req.body._id, function(err){
			if(err){
				console.log("ERROR!");
			} else{
				res.json({});
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
		console.log(req.params.id);
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

app.get('/blog', metods.showBlog);	
app.post('/blog', metods.addBlog);
app.get('/blog/:id', metods.findBlog);
app.delete('/blog/:id', metods.delBlog);
app.put('/blog/:id', metods.changeBlog);


app.listen(port, function(){
	console.log(`Started on ${port} port!`);
});
