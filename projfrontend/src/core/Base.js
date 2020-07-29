import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer fixed-bottom bg-dark mt-auto py-1">
      <div className="container-fluid bg-success text-white text-center py-1">
        <h6>If you got any questions, feel free to reach out!</h6>
      </div>
    </footer>
  </div>
);

export default Base;
