import React from "react";
import { Link } from "react-router-dom";

export default function NavHeader() {
  return (
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link to="/" className="navbar-brand page-scroll">React Landing Page</Link>
    </div>
  );
}