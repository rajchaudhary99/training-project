import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {

  return (
    <div class="sidebar">
    <ul>
      <li>
      <Link to="/">
          <i className="fa fa-home"></i>
          <span className="tooltiptext" >Home</span> 
        </Link>
      </li>
      <li>
      <Link to="/">
          <i className="fa fa-dashboard"></i>
          <span className="tooltiptext" >Dashboard</span> 
          </Link>
      </li>
      <li>
      <Link to="/users">
          <i className="fa fa-user-plus"></i>
          <span className="tooltiptext" >For User</span>
          </Link>
      </li>
    </ul>
  </div>
  
  );
}

export default Sidebar;
