const	express = require("express"),
		router = express.Router({mergeParams: true}),
		Comment= require("../models/comment"),
		Blog= require("../models/blog");

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
	deleteComment: function(req, res){
		let arrOfId = req.params.id.split('---');
		Blog.findById(arrOfId[1], function(err, blog){
			if(err){
				console.log("ERROR!");
				res.send(err);
			} else {
				let length = blog.comments.length;
				let comments = blog.comments;
				for(let i=0; i<length; i++){
					console.log(i);
					console.log(comments[i]);
					console.log("ssss");
					console.log(arrOfId[0]);
					if(comments[i] == arrOfId[0]){
						console.log("find");
						blog.comments.splice(i, 1);
						blog.save(function(err, newNewData){
							if(err){
								console.log("ERROR!");
								res.send(err);
							} else {
								Comment.findByIdAndRemove(arrOfId[0], function(err){
									console.log("comment");
									if(err){
										console.log("ERROR!");
										res.send(err);
									} else{
										res.json({answ:true});
									}
								});
							}
						});
						break;
					}
				}
				
			}
		});
		
	},
};

router.post('/blog/comment', commentMetods.addComment);
router.get('/blog/comment/:id', commentMetods.findComment);
router.put('/blog/comment/:id', commentMetods.changeComment);
router.delete('/blog/comment/:id', commentMetods.deleteComment);

module.exports = router;
