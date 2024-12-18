import React from 'react';
import { Outlet } from 'react-router-dom';  
import Sidebar from '../components/Sidebar.jsx';
import './Layout.css';  
const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Outlet />  
      </div>
    </div>
  );
}

export default Layout;
