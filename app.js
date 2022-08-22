// JShint esversion: 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app =  express();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://"+process.env.DATABASE_API_USERNAME+":"+process.env.DATABASE_API_PASSWORD+"@cluster0.mjlk1.mongodb.net/?retryWrites=true&w=majority/testDB/test", {useNewUrlParser: true});
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegramHandler = require(__dirname + "/views/telegramHandler.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');



bot.on("message", (ctx) =>{
  var res = telegramHandler.getLink(ctx.message);
  console.log(res);
})
bot.launch();


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
const User = mongoose.model("auth", authSchema);
const News = mongoose.model("news", newsSchema);
const Alumni = mongoose.model("users", alumniSchema);

// bot

app.get("/", function(req, res){
  res.render("core", {content: "landing"})
  // res.sendFile(__dirname+"/pages/home.html");
});



app.get("/skills", function(req, res){
    res.render("core", {content: "skills"})
  // res.sendFile(__dirname+"/pages/skills.html");
});



app.get("/education", function(req, res){
    res.render("core", {content: "education"})
// res.sendFile(__dirname+"/pages/education.html");
});



app.listen(3000, function(){
});
