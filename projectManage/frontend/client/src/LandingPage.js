import React from 'react';
import './LandingPage.css'; // You can style your components in App.css
import { Link } from 'react-router-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';
function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Project Planner</h1>
        <p>Your one-stop solution for efficient project management</p>
      </header>

      <div className="features">
        <div className="feature">
          <img src="https://media.istockphoto.com/id/1322000902/vector/manager-line-icon.jpg?s=612x612&w=0&k=20&c=YBwX9xVyIiClG20PdUlZiPoyRaLdU7hXJ9cOQHG7Hn0=" alt="Create Account" />
          <h2>Create Project Space</h2>
          <p>Get started by creating your account and organizing your projects.</p>
        <Link to='/Project-Form'><button onClick={() => { /* Handle create account click */ }}>Create Account</button></Link> 
        </div>


        <div className="feature">
          <img src="https://i.pinimg.com/474x/06/c6/a1/06c6a1d01c812881dca90cc7da43d89f.jpg" alt="Login" />
          <h2>Team Member Login</h2>
          <p>Already have a Project Workspace? Log in here to access your projects and collaborate with your team.</p>
          <Link to='/Project-Join'>  <button onClick={() => { /* Handle team member login click */ }}>Login</button></Link>
        </div>


        <div className="feature">
          <img src="https://t3.ftcdn.net/jpg/02/97/16/60/360_F_297166066_UTGdzB4u2syIVioVqmj6qcyoXSdocgjw.jpg" alt="Client Login" />
          <h2>Client Login</h2>
          <p>Are you a client? Log in here to view project progress and provide feedback.</p>
          <Link to='/ClientLogin'> <button onClick={() => { /* Handle client login click */ }}>Client Login</button></Link>
        </div>

      </div>
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container>
          <p className="text-center mb-0">&copy; 2024 Project Planner</p>
        </Container>
      </footer>


    </div>
  );
}

export default LandingPage;
