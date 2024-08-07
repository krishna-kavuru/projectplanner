import React, { useState } from 'react';
import axios from 'axios';

function Clientlogin({ history }) {
  const [projectName, setProjectName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post("http://localhost:8000/api/auth", {
        
        idforlogin:email,
        passwordforlogin:password
      });
      if (response.data.success) {
        history.push(`/HomePage?projectName=${projectName}`);
      } else {
        setError('Invalid project name, email, or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">Project Name:</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Clientlogin;
