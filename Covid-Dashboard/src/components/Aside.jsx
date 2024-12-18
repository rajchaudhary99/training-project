import React from 'react';
import './Aside.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Aside = () => (
  <aside className="_social-links">
    <ul className="_links-list">
      <li className="_social-link">
        <a href="https://www.instagram.com/raj_vardhan_chaudhary_99/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-instagram"></i>
        </a>
      </li>
      <li className="_social-link">
        <a href="https://github.com/rajchaudhary99" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
        </a>
      </li>
      <li className="_social-link">
        <a href="https://www.linkedin.com/in/rajvardhanchaudhary/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </li>
    </ul>
  </aside>
);

export default Aside;
