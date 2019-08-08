import React from 'react';
import ReactDOM from 'react-dom'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import Workouts from './components/Workouts.jsx';
import CreateWorkout from './components/CreateWorkout.jsx'
import UpdateWorkout from './components/UpdateWorkout.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: [],
      planned: [],
      processed: {},
      modalOpen: false,
      selected: {}
    }
    this.workoutClickHandler = this.workoutClickHandler.bind(this);
    this.creationClickHandler = this.creationClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false, selected: {} })
  }

  deleteWorkout() {
    const selectedID = this.state.selected._id;
    const selectedCompleted = this.state.selected.completed
    const planned = [...this.state.planned];
    const completed = [...this.state.completed];

    if (!selectedCompleted) {
      for (let i = 0; i < planned.length; i ++) {
        if (planned[i]._id === selectedID) {
          planned.splice(i,1)
          break;
        }
      }
    } else {
      for (let i = 0; i < completed.length; i ++) {
        if (completed[i]._id === selectedID) {
          completed.splice(i,1)
          break;
        }
      }
    }
    axios.delete(`/workouts/${selectedID}`)
      .then(result => {
        this.setState({ modalOpen: false, selected: {}, planned: planned, completed: completed })
      })
      .catch(err => {
        console.log('Error updating a workout', err)
      })
  }

  updateWorkout() {
    const updateForm = document.getElementById('update-form');
    const updatedInfo = this.generateWorkoutFromForm(updateForm);
    const selectedWorkout = {...this.state.selected};
    const updatedWorkout = Object.assign(selectedWorkout, updatedInfo);
    const planned = [...this.state.planned];
    const completed = [...this.state.completed];
    // Find workout BEFORE it was updated
    if (!this.state.selected.completed) {
      for (let i = 0; i < planned.length; i ++) {
        if (planned[i]._id === updatedWorkout._id) {
          planned.splice(i,1)
          break;
        }
      }
    } else {
      for (let i = 0; i < completed.length; i ++) {
        if (completed[i]._id === updatedWorkout._id) {
          completed.splice(i,1)
          break;
        }
      }
    }
    updatedWorkout.completed === true ? completed.push(updatedWorkout) : planned.push(updatedWorkout);
    axios.put(`/workouts/${updatedWorkout._id}`, updatedWorkout)
      .then(result => {
        this.setState({ modalOpen: false, selected: {}, planned: planned, completed: completed })
      })
      .catch(err => {
        console.log('Error updating a workout', err)
      })
  }

  //omitLast is to handle forms with a button; buttonless forms will use all child elements
  generateWorkoutFromForm (form, omitLast = 0) {
    const workout = {}
    for (let i = 0; i < form.length - omitLast; i++) {
      workout[form[i].name] = form[i].value;
      form[i].value = '';
    }
    workout.completed.toLowerCase().includes('y') ? workout.completed = true : workout.completed = false;
    return workout;
  }

  creationClickHandler(e) {
    e.preventDefault();
    const workoutData = e.target
    const workout = this.generateWorkoutFromForm(workoutData, 1); //Omit last child as workoutData came from a form w/ a button as last child
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
    this.setState({modalOpen: true, selected: workout})
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
        <Row id="create-row" className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <h3>Enter a Workout</h3>
          </Row>
          <CreateWorkout clickHandler={this.creationClickHandler}></CreateWorkout>
        </Row>
        <Row>
          <Col id="planned-col">Planned Workouts
          <br></br>
            <Workouts workouts={this.state.planned} clickHandler={this.workoutClickHandler} completed={false}></Workouts>
          </Col>
          <Col id="completed-col">Completed Workouts
          <br></br>
            <Workouts workouts={this.state.completed} clickHandler={this.workoutClickHandler} completed={true}></Workouts>
          </Col>

        </Row>
        <Modal show={this.state.modalOpen} onHide={this.closeModal} centered>
          <Modal.Header id="update-header">
            <Modal.Title >Update or Delete a Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Update Your Workout:</h5>
            <UpdateWorkout workout={this.state.selected}></UpdateWorkout>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal} variant="dark">Close</Button>
            <Button onClick={this.deleteWorkout} variant="danger">Delete</Button>
            <Button onClick={this.updateWorkout} variant="dark">Update</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));