import React, { useState } from 'react';
import './Documents.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const Documents = () => {
  const location = useLocation();
  const [projectName, setProjectName] = useState(new URLSearchParams(location.search).get('projectName'));
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a new document object
    const newDocument = {
      name: documentName,
      type: documentType,
      date: documentDate,
      file: file
    };

    // Add the new document to the documents list
    setDocuments([...documents, newDocument]);

    // Clear form fields
    setDocumentName('');
    setDocumentType('');
    setDocumentDate('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleLogout = () => {
    // Handle logout logic here
    // For example, clear local storage or reset authentication state
    // Then redirect to the landing page
    window.location.href = '/LandingPage'; // Redirect to the landing page
  };

  return (
    <div>
      {/* Navigation bar */}
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

      {/* Document Management section */}
      <div className="DocumentManager">
        <h1>Document Management</h1>
        {/* Document submission form */}
        <form onSubmit={handleFormSubmit}>
          {/* Form fields */}
          <div className="form-group">
            <label>Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          {/* Other form fields */}
          <div className="form-group">
            <label>Document Name:</label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Document Type:</label>
            <input
              type="text"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={documentDate}
              onChange={(e) => setDocumentDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>

        {/* Display list of documents */}
        <div className="DocumentList">
          <h2>Uploaded Documents</h2>
          <ul>
            {documents.map((document, index) => (
              <li key={index}>
                <strong>{document.name}</strong> - {document.type} - {document.date}
                {document.file && (
                  <a href={URL.createObjectURL(document.file)} download={document.name}>
                    Download
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Your Company</p>
        </Container>
      </footer>
    </div>
  );
};

export default Documents;
