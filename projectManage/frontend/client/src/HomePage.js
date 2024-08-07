import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap'; 
import './HomePage.css';

function HomePage() {
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get('projectName');
  const [teamMemberNames, setTeamMemberNames] = useState([]);

  useEffect(() => {
    console.log('Fetching team members for project:', projectName);
    fetchTeamMembers(projectName);
  }, [projectName]);

  const fetchTeamMembers = async (projectName) => {
    try {
      const response = await fetch(`/api/users?projectName=${projectName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log(data); // Log the received data
        const names = data.map(member => member.name); // Extracting names from the fetched data
        setTeamMemberNames(names);
      } else {
        throw new Error('Response is not in JSON format');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };
  

  const handleLogout = () => {
    window.location.href = '/LandingPage';
  };

  return (
    <div className="home-page">
     <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Project: {projectName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={`/HomePage?projectName=${projectName}`} className="nav-link">Home</Link>
              <Link to={`/Dashboard?projectName=${projectName}`} className="nav-link">Meet</Link>
              <Link to={`/Tasks?projectName=${projectName}`} className="nav-link">Tasks</Link>
              <Link to={`/Documents?projectName=${projectName}`} className="nav-link">Documents</Link>
              <Link to={`/Users?projectName=${projectName}`} className="nav-link">Users</Link>
              <Link to={`/Discussion?projectName=${projectName}`} className="nav-link">Discussion</Link>
              <Link to={`/Agile?projectName=${projectName}`} className="nav-link">Agile</Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button> {/* Logout button */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <h2>Team Members</h2>
        {teamMemberNames.length > 0 ? (
          <ul>
            {teamMemberNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>No team members found</p>
        )}
      </Container>

      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Project Management Tool</p>
        </Container>
      </footer>
    </div>
  );
}

export default HomePage;
