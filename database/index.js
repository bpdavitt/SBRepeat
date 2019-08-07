const mongoose = require('mongoose');
const config = require('../config.js')

mongoose.connect(config.DBURI, { user: config.DBUSER, pass: config.DBPASS, useNewUrlParser: true }, () => {
  console.log('Database connected')
})

const workoutSchema = mongoose.Schema({
  name: String,
  duration: Number,
  distance: Number,
  distanceUnit: String,
  notes: String,
  type: String,
  date: { type: Date, default: Date.now }
})

const Workout = mongoose.model('Workout', workoutSchema);

const getSome = () => {
  return Workout.find().limit(100)
    .catch(() => { console.log('Error getting some products') })
}

const addOne = (workout) => {
  console.log(workout)
  return Workout.updateOne({ "_id": workout._id }, workout, { upsert: true })
    .then(result => {
      console.log(result);
      return result
    })
    .catch(err => {
      console.log('Error:', err)
    })
}

module.exports = { getSome, addOne };