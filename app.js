require('dotenv').config();

const axios = require("axios");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");

const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const express = require("express");

const githubAPI =
  "https://api.github.com/repos/neetcode-gh/leetcode/contents/python/";
const app = express();

var currentDay = 0;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_KEY}@cluster0.mjlk1.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, writeConcern: { w: 'majority', j: true, wtimeout: 1000 } });





app.get("/", function (req, res) {
  res.render("core", { content: "landing" });
});

app.get("/skills", function (req, res) {
  res.render("core", { content: "skills" });
});

app.get("/education", function (req, res) {
  res.render("core", { content: "education" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("listening on port 3000");
});
