import React from 'react';
import Workout from './Workout.jsx'

const Workouts = (props) => {
  const { workouts } = props;
  console.log(workouts)
  for (let element of workouts) {
    element.date = new Date(element.date)
  }
  console.log(workouts)
  workouts.sort((a, b) => {
    // Sort planned workouts in ascending order, completed in descending order
    if (!props.completed) {
      return a.date - b.date;
    } else {
      return b.date - a.date;
    }
  })
  return (
    <>
      {workouts.map(workout => {
        return <Workout workout={workout} key={workout._id} clickHandler={props.clickHandler}/>
      })}
    </>
  )
}

export default Workouts;