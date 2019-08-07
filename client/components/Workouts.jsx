import React from 'react';
import Workout from './Workout.jsx'

const Workouts = (props) => {
  const { workouts } = props;

  return (
    <>
      {workouts.map(workout => {
        return <Workout workout={workout} key={workout._id}/>
      })}
    </>
  )
}

export default Workouts;