import React from 'react';

const UpdateWorkout = (props) => {
  const { workout } = props;
  let date = new Date(workout.date);
  let dateStr = date.toLocaleDateString();
  return (
    <div>
      <form onSubmit={(e) => { props.clickHandler(e) }} id="update-form">
        <label className="modal-label">Type of Workout:
          <input type="text" name="type" placeholder="Workout type (swim, bike, run)" defaultValue={workout.type} className="modal-input"></input>
        </label>
        <label className="modal-label">Date of Workout:
          <input type="text" name="date" placeholder="MM/DD/YYYY" defaultValue={dateStr} className="modal-input"></input>
        </label>
        <label className="modal-label">Distance:
          <input type="number" name="distance" placeholder="Distance" defaultValue={workout.distance} className="modal-input"></input>
        </label>
        <label className="modal-label">Unit of Measurement:
          <input type="text" name="distanceUnit" placeholder="(miles, yards, etc)" defaultValue={workout.distanceUnit} className="modal-input"></input>
        </label>
        <label className="modal-label">Workout Duration:
          <input type="number" name="duration" placeholder="Duration (in minutes)" defaultValue={workout.duration} className="modal-input"></input>
        </label>
        <label className="modal-label">Workout name:
          <input type="text" name="name" placeholder="Name of Workout" defaultValue={workout.name} className="modal-input"></input>
        </label>
        <label className="modal-label">Notes:
          <input type="text" name="notes" placeholder="Workout Notes" defaultValue={workout.notes} className="modal-input"></input>
        </label>
        <label className="modal-label">Workout Completed?:
          <input type="text" name="completed" placeholder="Completed? (y/n)" className="modal-input"></input>
        </label>
      </form>
    </div>
  )

}

export default UpdateWorkout;