import React from 'react';
import ReactDOM from 'react-dom'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import Workouts from './components/Workouts.jsx';
import CreateWorkout from './components/CreateWorkout.jsx'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: [],
      planned: [],
      processed: {},
      modalOpen: false
    }
    this.workoutClickHandler = this.workoutClickHandler.bind(this);
    this.creationClickHandler = this.creationClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  creationClickHandler(e) {
    e.preventDefault();
    const workoutData = e.target
    const workout = {}
    for (let i = 0; i < workoutData.length - 1; i++) {
      workout[workoutData[i].name] = workoutData[i].value;
      workoutData[i].value = '';
    }
    workout.completed.toLowerCase().includes('y') ? workout.completed = true : workout.completed = false;
    axios.post('/workouts/new', workout)
      .then(result => {
        let added = result.data;
        if (added.completed === true) {
          this.setState({ completed: [...this.state.completed, added] });
        } else {
          this.setState({ planned: [...this.state.planned, added] });
        }
      })
      .catch(err => {
        console.log('Error on submission of new workout');
      })
  }

  workoutClickHandler(e, workout) {
    console.log('You clicked a workout')
    console.log(workout)
    this.setState({modalOpen: true})
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
        </Row>
        <Row id="create-row">
          <CreateWorkout clickHandler={this.creationClickHandler}></CreateWorkout>
        </Row>
        <Row>
          <Col id="planned-col">Planned Workouts
          <br></br>
            <Workouts workouts={this.state.planned} clickHandler={this.workoutClickHandler}></Workouts>
          </Col>
          <Col id="completed-col">Completed Workouts
          <br></br>
            <Workouts workouts={this.state.completed} clickHandler={this.workoutClickHandler}></Workouts>
          </Col>

        </Row>
        <Modal show={this.state.modalOpen} onHide={this.closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal Heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Selected workouts will be displayed here!
            <CreateWorkout></CreateWorkout>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button onClick={this.closeModal}>Delete</Button>
            <Button onClick={this.closeModal}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));