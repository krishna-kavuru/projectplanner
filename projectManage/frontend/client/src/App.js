import LandingPage from './LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ProjectJoin from './ProjectJoin';
import HomePage from './HomePage';
import Tasks from './Tasks';
import Documents from './Documents';
import Users from './Users';
import Discussion from './Discussion';
import Clientlogin from './Clientlogin';
import { useState } from 'react';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agile from './Agile';

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/ProjectForm" element={<ProjectForm />} />
          <Route path="/ProjectJoin" element={<ProjectJoin />} />
          {/* Pass project name and setter function to HomePage component */}
          <Route path="/HomePage" element={<HomePage  />} />
          <Route path="/ProjectForm" element={<ProjectForm  />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/Documents" element={<Documents />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Discussion" element={<Discussion />} />
          <Route path="/Clientlogin" element={<Clientlogin />} />
          <Route path="/Project-Form" element={<ProjectForm />} />
          <Route path="/Project-Join" element={<ProjectJoin />} />
          <Route path="/ClientLogin" element={<Clientlogin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Agile" element={<Agile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
