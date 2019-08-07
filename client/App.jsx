import React from 'react';
import ReactDOM from 'react-dom'
import {Container, Row, Col} from 'react-bootstrap'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container>
        <Row id="banner">
        <div>SBRepeat has mounted</div>
        </Row>
        <Row>
          <Col id="planned-col">Planned Workouts</Col>
          <Col id="completed-col">Completed Workouts</Col>
        </Row>
      </Container>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));