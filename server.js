import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Setup empty JS object to act as endpoint for all routes
const projectData = {};


// Start up an instance of app
const app = express();
const port = "8000";

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
  console.log("listening on port " + port)
});

//#region Routes

// Get all 
app.get('/api/getAll', (req, res) => {
  res.send(projectData)
});

app.post('/api/set', (req, res) => {
  const newEntry = {};
  newEntry.date = req.body.date;
  newEntry.temprature = req.body.temp;
  newEntry.content = req.body.content;

  projectData[req.body.timestamp] = newEntry;

  res.send(projectData);
  console.log(projectData);
})




//#endregion

