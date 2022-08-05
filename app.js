const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const fName = req.body.fName;
  const lName = req.body.lName;
  const eMail = req.body.eMail;
  console.log(fName + lName + eMail);
});

app.listen("3000", function () {
  console.log("Server initialized on port 3000!");
});