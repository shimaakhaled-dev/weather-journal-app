// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start local server
const app = express();
/* Middleware*/

//require bodyparser to turn data into json
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
// to connect between localServer and brower
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, tracking);

function tracking() {
  console.log("server is Running");
  console.log(`run on local host :${port}`);
}

//to send data to the server
// when trigger happened it will run(post) the function to put the data in my obj/ server (projectData = {};)
app.post("/triger", function (req, res) {
  projectData = req.body;
  res.send(projectData);

  console.log(projectData);
});
//get data from server
app.get("/return", function (req, res) {
  res.send(projectData);
});
