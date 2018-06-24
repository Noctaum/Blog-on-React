
const bodyParser     = require('body-parser'),
	  mongoose       = require("mongoose"),
	  express        = require('express'),
	  app            = express();

//let port = process.env.PORT || 8096;
let port = 8096;

let blogRoutes = require("./server/routes/blog"),
	commentRoutes = require("./server/routes/comment");

mongoose.connect("mongodb://localhost/blogs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(blogRoutes);
app.use(commentRoutes);

app.listen(port, function(){
	console.log(`Started on ${port} port!`);
});
