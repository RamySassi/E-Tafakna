import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Users from './pages/Users';
import Dashboard from './pages/Dashbord';
import Contrat from './pages/Contrat';
import ContractDetails from './pages/ContractDetails'; 

function App() {
  return (
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
        <div className='dashboard-body'>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/Users" element={<Users />} />
            <Route exact path="/contrat" element={<Contrat />} />
            <Route exact path="/contract-details/:id" element={<ContractDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
