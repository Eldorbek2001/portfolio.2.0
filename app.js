// JShint esversion: 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app =  express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function(req, res){
  res.render('core', {content: 'landing'});
});

app.get("/skills", function(req, res){
  res.render('core', {content: 'skills'});
});



app.get("/education", function(req, res){
  res.render('core', {content: 'education'});
});



app.listen(3000, function(){
  console.log("listening to port 3000")
})
