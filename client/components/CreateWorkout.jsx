import React from 'react';

const CreateWorkout = (props) => {

  return (
    <div>
      <form onSubmit={(e) => { props.clickHandler(e) }} id="creation-form">
        <label className="creation-label">Type of Workout:
          <input type="text" name="type" placeholder="Workout type (swim, bike, run)" className="creation-input"></input>
        </label>
        <label className="creation-label">Date of Workout:
          <input type="text" name="date" placeholder="MM/DD/YYYY" className="creation-input"></input>
        </label>
        <label className="creation-label">Distance:
          <input type="number" name="distance" placeholder="Distance" className="creation-input"></input>
        </label>
        <label className="creation-label">Unit of Measurement:
          <input type="text" name="distanceUnit" placeholder="(miles, yards, etc)" className="creation-input"></input>
        </label>
        <label className="creation-label">Workout Duration:
          <input type="number" name="duration" placeholder="Duration (in minutes)" className="creation-input"></input>
        </label>
        <label className="creation-label">Workout Name:
          <input type="text" name="name" placeholder="Name of Workout" className="creation-input"></input>
        </label>
        <label className="creation-label">Notes:
          <input type="text" name="notes" placeholder="Workout Notes" className="creation-input"></input>
        </label>
        <label className="creation-label">Workout Completed?:
          <input type="text" name="completed" placeholder="Completed? (y/n)" className="creation-input"></input>
        </label>
        <br/>
        <button type="submit">Add Workout</button>
      </form>
    </div>
  )

}

export default CreateWorkout;