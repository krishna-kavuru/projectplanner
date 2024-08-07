import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './Discussion.css';

function Discussion() {
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get('projectName');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/LandingPage');
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/messages?projectName=${projectName}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/messages', { projectName, text: message });
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="discussion-page">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">PROJECT: {projectName}</Navbar.Brand>
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

      <Container className="discussion-container">
        <div className="message-box">
          {messages.map((msg, index) => (
            <div key={index} className="message-item">
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="typing-area">
          <Form onSubmit={handleMessageSubmit}>
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Discussion;
