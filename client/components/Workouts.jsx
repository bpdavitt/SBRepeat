import React, { useState } from 'react';
import Workout from './Workout.jsx';
import ReactPaginate from 'react-paginate';

const Workouts = (props) => {
  const { workouts } = props;
  
  // Hook to determine where to start for pagination
  const [start, setStart] = useState(0)
  const perPage = 6;
  
  // ClickHandler for pagination
  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);
    setStart(offset)
  }

  // Ensure all dates in workouts array are Date objects (for comparison and display)
  for (let element of workouts) {
    element.date = new Date(element.date)
  }
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
      {workouts.slice(start, start + perPage).map(workout => {
        return <Workout workout={workout} key={workout._id} clickHandler={props.clickHandler} />
      })}
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName='react-paginate'
          pageCount={Math.ceil(workouts.length/perPage)}
          // pageCount={workouts.length}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick.bind(this)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageClassName='react-paginate'
          previousClassName = 'react-paginate'
          nextClassName = 'react-paginate'
          activeClassName = 'paginate-selected'
        />
    </>
  )
}

export default Workouts;