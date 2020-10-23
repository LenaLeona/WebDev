//jshint esversion: 6

const express = require("express");

const app = express();

//location of the request - homepage /: the route
app.get("/", function(req, res){
  res.send("<h1>Hello, world</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me at: lena@gmail.com");
});

app.get("/about", function(req, res){
  res.send("<p>I am a Computer Science student at Northeastern.</p>");
});

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Coffee</li><li>Code</li></ul></p>");
});

//listen to the http server
//3000 is a port (like a radio chanel) where the localserver hosts
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
