const	express = require("express"),
		router = express.Router({mergeParams: true}),
		Comment= require("../models/comment");

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

router.post('/blog/comment', commentMetods.addComment);
router.get('/blog/comment/:id', commentMetods.findComment);
router.put('/blog/comment/:id', commentMetods.changeComment);

module.exports = router;
