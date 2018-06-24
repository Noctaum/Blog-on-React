const	express = require("express"),
		router = express.Router({mergeParams: true}),
		Blog= require("../models/blog");


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


router.get('/blog', blogMetods.showBlog);	
router.post('/blog', blogMetods.addBlog);
router.get('/blog/:id', blogMetods.findBlog);
router.delete('/blog/:id', blogMetods.delBlog);
router.put('/blog/:id', blogMetods.changeBlog);

module.exports = router;