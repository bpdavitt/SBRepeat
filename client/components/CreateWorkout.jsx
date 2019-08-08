import React from 'react';

const CreateWorkout = (props) => {

  return(
    <div>
      <form onSubmit={(e)=>{props.clickHandler(e)}}>
        <input type="text" name="type" placeholder="Type of workout"></input>
        <input type="text" name="date" placeholder="MM/DD/YYYY"></input>
        <input type="number" name="distance" placeholder="Distance"></input>
        <input type="text" name="distanceUnit" placeholder="(miles, yards, etc)"></input>
        <input type="number" name="duration" placeholder="Duration (in minutes)"></input>
        <input type="text" name="name" placeholder="Name of Workout"></input>
        <input type="text" name="notes" placeholder="Workout Notes"></input>
        <input type="text" name="completed" placeholder="Completed? (y/n)"></input>
        <button type="submit">Add Workout</button>
      </form>
    </div>
  )

}

export default CreateWorkout;