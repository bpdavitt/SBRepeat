const db = require('../index.js');
const faker = require('faker');

const types = ['swim', 'bike', 'run'];
const measurements = ['miles', 'meters', 'yards'];

(async () => {

  let all = [];
  for (let i = 0; i < 70; i++) {
    let workout = {}
    workout.name = faker.commerce.productName()
    workout.duration = Math.floor(Math.random() * 300)
    workout.distance = Math.floor(Math.random() * 2000)
    workout.distanceUnit = measurements[Math.floor(Math.random() * 3)]
    workout.notes = faker.company.bs();
    workout.type = types[Math.floor(Math.random() * 3)]
    workout.date = faker.date.between('2019-08-01', '2019-08-31')
    workout.completed = true;

    all.push(workout);
  }

  await db.bulkImport(all)
    .then((result) => console.log('donezo', result, new Date))
    .catch((fail) => console.log('enjoy the fail', fail))

})()

// let all = [];
// for (let i = 0; i < 70; i++) {
//   let workout = {}
//   workout.name = faker.commerce.productName()
//   workout.duration = Math.floor(Math.random() * 300)
//   workout.distance = Math.floor(Math.random() * 2000)
//   workout.distanceUnit = measurements[Math.floor(Math.random() * 3)]
//   workout.notes = faker.company.bs();
//   workout.type = types[Math.floor(Math.random() * 3)]
//   workout.date = faker.date.between('2019-08-01', '2019-08-31')
//   workout.completed = true;

//   all.push(workout);
// }

// console.log(all)