import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

const Workout = (props) => {
  const { workout } = props;
  console.log(workout)
  return (
    <Container className="workout">
      <Row>
        <Col sm={4}>
          <img src={`./util/${workout.type}.png`} className="workout-image"/>
        </Col>
        <Col sm={8}>A workout will go here</Col>
      </Row></Container>
  )
}

export default Workout;