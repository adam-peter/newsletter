const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const secret = require("./secret.json");
const API = secret.API;
const listId = secret.listId;
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
 
mailchimp.setConfig({
  apiKey: API,
  server: API.slice(-3)
});
 
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})
 
app.post("/", function(req, res){
 
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };
 
  async function run() {
    try{
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
 
      console.log(
        `Successfully added contact as an audience member.`
      );
      res.sendFile(__dirname + "/public/pages/success.html");
    }catch (e){
      res.sendFile(__dirname + "/public/pages/fail.html");
    }
      
  }
 
  run();
})

app.post("/failure", function(req, res){
  res.redirect("/");
})
 
app.listen(3000, function () {
  console.log("Server is running on port 3000")
});





