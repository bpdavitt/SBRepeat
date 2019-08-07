const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../database/index.js');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Get Ready to Workout!');
});

app.post('/workouts', (req, res) => {
  db.addOne(req.body)
    .then((data) => {
      console.log(data)
      res.send('Product added')
    })
    .catch(()=> res.end())
})

app.get('/workouts', (req, res) => {
  db.getSome()
    .then(data => {
      res.send(data);
    })
})

app.listen(PORT, () => console.log('SBRepeat server running on port', PORT))