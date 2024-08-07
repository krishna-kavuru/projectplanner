import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap'; // Import Bootstrap components
import './Agile.css';

function Agile() {
  const location = useLocation();
  const projectName = new URLSearchParams(location.search).get('projectName');
  
  // Sample data for Agile methodologies
  const agileData = {
    overview: `Agile methodologies are a group of approaches to software development that emphasize
      iterative development, collaboration between cross-functional teams, and customer
      feedback. Agile methods break tasks into small increments with minimal planning and
      do not directly involve long-term planning. They promote adaptive planning, evolutionary
      development, early delivery, and continuous improvement.`,
    principles: [
      {
        title: 'Agile Manifesto',
        description: `The Agile Manifesto is a statement of four key values and twelve principles that underpin Agile software development. It emphasizes individuals and interactions, working software, customer collaboration, and responding to change over following a plan and contract negotiation.`
      },
      {
        title: 'Core Principles',
        description: `Agile methodologies are guided by several core principles, including customer satisfaction through early and continuous delivery, welcoming changing requirements, delivering working software frequently, collaborating closely with customers, and enabling self-organizing teams.`
      }
    ],
    methodologies: [
      {
        name: 'Scrum',
        description: `Scrum is a widely used Agile framework that emphasizes iterative development, with work organized in sprints. It includes roles such as Product Owner, Scrum Master, and Development Team, and ceremonies such as Sprint Planning, Daily Standups, Sprint Review, and Sprint Retrospective.`
      },
      {
        name: 'Kanban',
        description: `Kanban is an Agile method that focuses on visualizing work, limiting work in progress, and maximizing flow. It uses a Kanban board to visualize the workflow, with columns representing different stages of work, and cards representing tasks or user stories.`
      },
      {
        name: 'Extreme Programming (XP)',
        description: `Extreme Programming (XP) is an Agile software development framework that emphasizes coding practices such as pair programming, test-driven development (TDD), continuous integration, and frequent releases. It aims to improve software quality and responsiveness to changing customer requirements.`
      },
      {
        name: 'Lean Software Development',
        description: `Lean Software Development is an Agile methodology inspired by Lean manufacturing principles. It focuses on delivering value to customers by eliminating waste, optimizing the whole system, and empowering teams. Lean practices include value stream mapping, just-in-time delivery, and continuous improvement.`
      }
    ],
    resources: [
      {
        title: 'Agile Alliance',
        url: 'https://www.agilealliance.org/',
        description: `The Agile Alliance is a global nonprofit organization dedicated to promoting the concepts of Agile software development. Their website offers resources, events, and community forums for Agile practitioners.`
      },
      {
        title: 'Scrum.org',
        url: 'https://www.scrum.org/',
        description: `Scrum.org is a community organization that provides resources, training, and certification for Scrum practitioners. Their website offers Scrum guides, training courses, and a professional network for Scrum enthusiasts.`
      },
      {
        title: 'Kanbanize',
        url: 'https://kanbanize.com/',
        description: `Kanbanize is a Kanban software platform that helps teams visualize and manage their work. Their website offers tools for Kanban board creation, workflow automation, and performance analytics.`
      },
      {
        title: 'Extreme Programming',
        url: 'http://www.extremeprogramming.org/',
        description: `Extreme Programming (XP) is an Agile software development methodology that emphasizes values such as communication, simplicity, feedback, and courage. Their website provides resources, case studies, and community forums for XP practitioners.`
      }
    ]
  };

  const handleLogout = () => {
    // Handle logout logic here
    // For example, clear local storage or reset authentication state
    // Then redirect to the landing page
    window.location.href = '/LandingPage'; // Redirect to the landing page
  };

  return (
    <div className="agile-page">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Project: {projectName}</Navbar.Brand>
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

      <Container className="mt-4">
        <h2 className="mb-4">Agile Methodologies Overview</h2>
        <p>{agileData.overview}</p>

        <h2 className="mb-4">Agile Principles</h2>
        {agileData.principles.map(principle => (
          <div key={principle.title} className="mb-4">
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </div>
        ))}

        <h2 className="mb-4">Popular Agile Methodologies</h2>
        {agileData.methodologies.map(methodology => (
          <div key={methodology.name} className="mb-4">
            <h3>{methodology.name}</h3>
            <p>{methodology.description}</p>
          </div>
        ))}

        <h2 className="mb-4">Additional Resources</h2>
        <ul>
          {agileData.resources.map(resource => (
            <li key={resource.title}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}</a> - {resource.description}
            </li>
          ))}
        </ul>
      </Container>
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Your Company</p>
        </Container>
      </footer>
    </div>
  );
}

export default Agile;
