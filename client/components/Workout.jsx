import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const Workout = (props) => {
  const { workout } = props;
  console.log(workout)
  let date = new Date(workout.date);
  // console.log(date)
  let dateStr = date.toLocaleDateString();
  return (
    <Container className="workout" onClick={(e)=>{props.clickHandler(e, workout)}}>
      <Row>
        <Col sm={4}>
          <img src={`./util/${workout.type}.png`} className="workout-image"/>
        </Col>
        <Col sm={8}>
          <Row>Date: {dateStr}</Row>
          <Row>Name: {workout.name}</Row>
          <Row>Distance: {`${workout.distance} ${workout.distanceUnit}`} </Row>
          <Row>Duration: {`${workout.duration} minutes`}</Row>
          <Row>Notes: {workout.notes}</Row>
        </Col>
      </Row></Container>
  )
}

export default Workout;