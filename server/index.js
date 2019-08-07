const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../database/index.js')

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Get Ready to Workout!');
});

app.listen(PORT, () => console.log('SBRepeat server running on port', PORT))