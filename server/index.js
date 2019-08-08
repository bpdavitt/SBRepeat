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

app.post('/workouts/new', (req, res) => {
  db.addOne(req.body)
    .then((data) => {
      res.send(data)
    })
    .catch(() => res.end())
})

app.get('/workouts', (req, res) => {
  db.getSome()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send();
    })
})

app.put('/workouts/:_id', (req, res) => {
  console.log(req.params)
  db.modOne(req.body)
    .then((data) => {
      res.send(data)
    })
    .catch(() => res.end())
})

app.delete('/workouts/:_id', (req, res) => {
  console.log(req.params._id)
  db.deleteOne(req.params._id)
    .then((data) => {
      res.send(`Object with id ${req.params._id} successfully deleted`)
    })
    .catch(() => res.end())
})

app.listen(PORT, () => console.log('SBRepeat server running on port', PORT))