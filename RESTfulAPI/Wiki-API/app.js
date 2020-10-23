//jshint esversion:6
//line 2 - 15 default codes
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//below are self-added codes

//connect to mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

//create schema
const articleSchema = {
  title: String,
  content: String
};

//create model: 首字母大写&单数 ——> mongoose会自动将其在DB里转为首字母小写&复数
const Article = mongoose.model("Article", articleSchema);

// start to build the app

//get(fetches) all items
// app.get("/articles", function(req, res) {
//   Article.find(function(err, foundArticles) {
//     if (!err) {
//       //all items will be shown on the webpage as json files, just like public API
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });
//
// //create a DB receiver in Mongoose
// //for data submitted through the post request in postman (client)
// app.post("/articles", function(req, res) {
//
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//
//   //save the item in DB
//   newArticle.save(function(err) {
//     if (!err) {
//       res.send("New article added!")
//     } else {
//       res.send(err);
//     }
//   });
// });
//
//
// //delete all data in Mongoose
// app.delete("/articles", function(req, res) {
//   Article.deleteMany(function(err) {
//     if (!err) {
//       res.send("Successfully delete all items!");
//     } else {
//       res.send(err);
//     }
//   });
// });

////////////////Now introduce chianable route handlers to simplify the get/post/delete methods above///////////////
// app.route("/articles")
// //.represents chained methods
// .get(function(req, res) {
//   Article.find(function(err, foundArticles) {
//     if (!err) {
//       //all items will be shown on the webpage as json files, just like public API
//       res.send(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// })
//
// .post(function(req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   })
//   //save the item in DB
//   newArticle.save(function(err) {
//     if (!err) {
//       res.send("New article added!")
//     } else {
//       res.send(err);
//     }
//   });
// })
//
// .delete(function(req, res) {
//   Article.deleteMany(function(err) {
//     if (!err) {
//       res.send("Successfully delete all items!");
//     } else {
//       res.send(err);
//     }
//   });
// });


////////////////use chained methods to get/put/patch/delete a specific items////////////
app.route("/articles/:articleTitle")

  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No matching result found");
      }
    });
  })

//update the whole object
  .put(function(req, res) {
    Article.update(
      {title: req.params.articleTitle},
      {title: req.body.title,content: req.body.content},
      {overwrite: true},
      function(err){
        if(!err){
          res.send("Item Successfully updated.");
        } else {
          res.send(err);
        }
      }
    );
  })

//only update the specific field of the object
.patch(function(req, res) {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Item Successfully updated.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res) {
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err) {
        res.send("Successfully delete the item!");
      } else {
        res.send(err);
      }
    }
  );
});




//default code
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
