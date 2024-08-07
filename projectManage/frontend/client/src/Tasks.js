// Tasks.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Form, Card } from 'react-bootstrap';

const Tasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState(new URLSearchParams(location.search).get('projectName'));
  const [taskName, setTaskName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    navigate('/LandingPage');
  };

  const handleSave = async () => {
    await axios.post('http://localhost:8000/api/tasks', { projectName, taskName, teamMember, submissionDate });
    setTaskName('');
    setTeamMember('');
    setSubmissionDate('');
    fetchTasks();
  };

  const fetchTasks = async () => {
    const response = await axios.get(`http://localhost:8000/api/tasks?projectName=${projectName}`);
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [projectName]);

  const handleStatusChange = async (taskId, status) => {
    await axios.put(`http://localhost:8000/api/tasks/${taskId}`, { status });
    fetchTasks();
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ fontFamily: 'Arial, sans-serif' }}>PROJECT: {projectName}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/HomePage?projectName=${projectName}`}>Home</Nav.Link>
            <Nav.Link as={Link} to={`/Dashboard?projectName=${projectName}`}>Meet</Nav.Link>
            <Nav.Link as={Link} to={`/Tasks?projectName=${projectName}`}>Tasks</Nav.Link>
            <Nav.Link as={Link} to={`/Documents?projectName=${projectName}`}>Documents</Nav.Link>
            <Nav.Link as={Link} to={`/Users?projectName=${projectName}`}>Users</Nav.Link>
            <Nav.Link as={Link} to={`/Discussion?projectName=${projectName}`}>Discussion</Nav.Link>
            <Nav.Link as={Link} to={`/Agile?projectName=${projectName}`}>Agile</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <Container className="py-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#343a40' }}>Add Task</h2>
            <div className="mb-3">
              <input type="text" className="form-control mb-2" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />
              <input type="text" className="form-control mb-2" value={teamMember} onChange={(e) => setTeamMember(e.target.value)} placeholder="Team Member" />
              <input type="date" className="form-control mb-2" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} placeholder="Submission Date" />
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mt-5">
              <h2 className="mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#343a40' }}>Tasks</h2>
              <div className="d-flex flex-wrap">
                {tasks.map((task, index) => (
                  <Card key={index} className="m-2" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title style={{ fontFamily: 'Arial, sans-serif', color: '#343a40' }}>Task Name: {task.taskName}</Card.Title>
                      <Card.Text style={{ fontFamily: 'Arial, sans-serif', color: '#6c757d' }}>Team Member: {task.teamMember}</Card.Text>
                      <Card.Text style={{ fontFamily: 'Arial, sans-serif', color: '#6c757d' }}>Submission Date: {task.submissionDate}</Card.Text>
                      <Form.Select onChange={(e) => handleStatusChange(task._id, e.target.value)} value={task.status} className="mb-2">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tasks;
