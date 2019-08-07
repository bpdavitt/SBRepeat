import React from 'react';
import ReactDOM from 'react-dom'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: [],
      planned: [],
      processed: {}
    }
  }

  processData(data) {
    let completed = [];
    let planned = [];
    // let processed = { ...this.state.processed };
    let processed = {}
    for (let workout of data) {
      if (!processed[workout._id]) {
        processed[workout._id] = true;
        if (workout.completed) {
          completed.push(workout);
        } else {
          planned.push(workout);
        }
      }
    }
    this.setState({
      completed: [...this.state.completed, ...completed],
      planned: [...this.state.planned, ...planned],
      processed: processed
    });
  }

  getData() {
    axios.get('/workouts')
      .then(result => {
        console.log(result.data)
        this.processData(result.data);
      })
      .catch(err => {
        console.log("Error getting data", err)
      })
  }

  componentDidMount() {
    this.getData();
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

ReactDOM.render(<App />, document.getElementById('app'));