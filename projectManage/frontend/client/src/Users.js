import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'; // Custom CSS
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const Users = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [projectName, setProjectName] = useState(new URLSearchParams(location.search).get('projectName'));
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users', {
        projectName,
        name,
        role,
        email
      });
      console.log(response.data);
      setProjectName('');
      setName('');
      setRole('');
      setEmail('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (projectName.trim() !== '') {
          const response = await axios.get('http://localhost:8000/api/users', {
            params: { projectName }
          });
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [projectName]);

  const handleLogout = () => {
    // Handle logout logic here
    // For example, clear local storage or reset authentication state
    // Then redirect to the landing page
    window.location.href = '/LandingPage'; // Redirect to the landing page
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Project: {new URLSearchParams(location.search).get('projectName')}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/HomePage?projectName=${projectName}`}>Home</Nav.Link>
            <Nav.Link as={Link} to={`/Dashboard?projectName=${projectName}`}>Meet</Nav.Link>
            <Nav.Link as={Link} to={`/Tasks?projectName=${projectName}`}>Tasks</Nav.Link>
            <Nav.Link as={Link} to={`/Documents?projectName=${projectName}`}>Documents</Nav.Link>
            <Nav.Link as={Link} to={`/Users?projectName=${projectName}`}>Users</Nav.Link>
            <Nav.Link as={Link} to={`/Discussion?projectName=${projectName}`}>Discussion</Nav.Link>
            <Nav.Link as={Link} to={`/Agile?projectName=${projectName}`}>Agile</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button> {/* Logout button */}
        </Container>
      </Navbar>

      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Team Member Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Team Member Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Job Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              placeholder="Enter Job Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>

        <div className="user-list mt-4">
          {users.map((user) => (
            <div key={user._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Project Name: {user.projectName}</h5>
                <p className="card-text">Name: {user.name}</p>
                <p className="card-text">Role: {user.role}</p>
                <p className="card-text">Email: {user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Your Company</p>
        </Container>
      </footer> */}
    </div>
  );
};

export default Users;
