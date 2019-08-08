const mongoose = require('mongoose');
const config = require('../config.js')

mongoose.connect(config.DBURI, { user: config.DBUSER, pass: config.DBPASS, useNewUrlParser: true, useFindAndModify: false }, (err) => {
  if (err) {
    console.log("Error Connecting:", err)
  } else {
    console.log('Database connected')
  }
})

const workoutSchema = mongoose.Schema({
  name: String,
  duration: Number,
  distance: Number,
  distanceUnit: String,
  notes: String,
  type: String,
  date: { type: Date, default: Date.now },
  completed: Boolean
})

const Workout = mongoose.model('Workout', workoutSchema);

const getSome = () => {
  return Workout.find().limit(200)
    .catch(() => { console.log('Error getting some products') })
}

const addOne = (workout) => {
  return Workout.create(workout)
    .then(result => {
      console.log(result);
      return result
    })
    .catch(err => {
      console.log('Error:', err)
    })
}

const modOne = (workout) => {
  return Workout.findOneAndUpdate({ _id: workout._id }, workout)
    .then(result => {
      console.log(result);
      return result
    })
    .catch(err => {
      console.log('Error:', err)
    })
}

const deleteOne = (id) => {
  return Workout.deleteOne({ _id: id })
    .then(result => {
      console.log(result);
      return result
    })
    .catch(err => {
      console.log('Error:', err)
    })
}

const bulkImport = (arr) => {
  return Workout.insertMany(arr)
    .then(result => {
      return 'Something got done'
    })
    .catch(fail => {
      return 'You messed up'
    })
}

module.exports = { getSome, addOne, modOne, deleteOne, bulkImport };