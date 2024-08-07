import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Dashboard.css';
import { Container, Navbar, Nav, Button, Card, Row, Col } from 'react-bootstrap';

function Dashboard() {
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get('projectName');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/LandingPage');
  };

  return (
    <div className="home-page">
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
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Row xs={1} sm={2} md={3} className="g-4">
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="https://www.shutterstock.com/image-vector/pakistan-12-01-2023-zoom-260nw-2397919805.jpg" />
              <Card.Body>
                <Card.Title>Zoom</Card.Title>
                <Card.Text>
                  Online video conferencing platform.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3Ig0FB-dGHGg6Mg3NCfgt1iV2g0cchQXHA&usqp=CAU" />
              <Card.Body>
                <Card.Title>Google Meet</Card.Title>
                <Card.Text>
                  Video meetings, conferencing, and collaboration.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Skype_logo_%28fully_transparent%29.svg/2560px-Skype_logo_%28fully_transparent%29.svg.png" />
              <Card.Body>
                <Card.Title>Skype</Card.Title>
                <Card.Text>
                  Communication tool for video, voice calls, and instant messaging.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Your Company</p>
        </Container>
      </footer>
    </div>
  );
}

export default Dashboard;
