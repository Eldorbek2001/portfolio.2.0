// JShint esversion: 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app =  express();
var nodemailer = require('nodemailer');



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


var newsSchema = {
author: String,
title: String,
date: Object,
content: String,
source: String,
}

var alumniSchema = {
fname: String,
lname: String,
mail: String,
photoPath: String,
role: String
}
var authSchema = {
  email: String,
  pwd: String
}
// bot

app.get("/", function(req, res){

  res.render("core", {content: "landing"})
});



app.get("/skills", function(req, res){
    res.render("core", {content: "skills"})

});



app.get("/education", function(req, res){
    res.render("core", {content: "education"})

});



app.listen(process.env.PORT || 3000, function(){
console.log("here" ) ;

});
