// Your server.js file should require the basic npm packages we've used in class: express and path.
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Create express app instance.
var app = express();

//=========
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");
app.use(routes);
//=========

// port listener
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });