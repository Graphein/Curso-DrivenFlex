import React from "react";
import { Link } from "react-router-dom";
import NavHeader from "./NavHeader";

export default function Menu() {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <NavHeader />
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/portfolio">Gallery</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/team">Team</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}