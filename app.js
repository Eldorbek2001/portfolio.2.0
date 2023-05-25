// JShint esversion: 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app =  express();
const BOT_TOKEN = "5526260914:AAFMZbzCPd5A9cEDrxUSSwrJbhX88RtaGE4";


// * Daily leetcode video
// ? maybe with the code answer
// * Daily Abdulloh domla audio
// * Daily Arabic lesson
// ? email 


// Leetcode Schema
// {leetcodeID:string, name: string, difficulty: string, video:string, problem:string, solution:string}




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


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
  console.log("listening on port 3000");

});
