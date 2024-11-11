require('dotenv').config();


const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');





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
