import React, { useState } from 'react';
import './ProjectForm.css'; // Import the CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
function ProjectForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    teamLeader: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    projectDomain: '',
    idforlogin: '',
    passwordforlogin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/projects", {
        projectName: formData.projectName,
        teamLeader: formData.teamLeader,
        projectDescription: formData.projectDescription,
        startDate: formData.startDate,
        endDate: formData.endDate,
        projectDomain: formData.projectDomain,
        idforlogin: formData.idforlogin,
        passwordforlogin: formData.passwordforlogin
      });

      
      const projectName = response.data.projectName;
      navigate(`/HomePage?projectName=${projectName}`);
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  return (
    <div>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="projectName">Project Name:</label>
              <input type="text" className="form-control" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="teamLeader">Team Leader:</label>
              <input type="text" className="form-control" id="teamLeader" name="teamLeader" value={formData.teamLeader} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description:</label>
              <textarea className="form-control" id="projectDescription" name="projectDescription" rows="4" placeholder="Description required" value={formData.projectDescription} onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="projectDomain">Project Domain:</label>
              <input type="text" className="form-control" id="projectDomain" name="projectDomain" value={formData.projectDomain} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="idforlogin">Login Id:</label>
              <input type="text" className="form-control" id="idforlogin" name="idforlogin" value={formData.idforlogin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="passwordforlogin">Password:</label>
              <input type="password" className="form-control" id="passwordforlogin" name="passwordforlogin" value={formData.passwordforlogin} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Create Project</button>
        </div>
      </form>
      
    </div>
    <div>
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Your Company</p>
        </Container>
      </footer>
    </div>
    </div>
  );
}

export default ProjectForm;
