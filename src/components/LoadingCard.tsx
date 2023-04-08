import React from "react";
import { Link } from "react-router-dom";

const LoadingCard: React.FC = () => {
  return (
    <div className="card-body placeholder-glow">

  <img src="" className="card-img-top placeholder mb-1" alt="..." />
      <h5 className="card-title">
        <span className="placeholder col-6"></span>
      </h5>
      
      <p className="card-text">
      <span className="placeholder col-10"></span>
      <span className="placeholder col-8"></span>
      </p>
      <Link
        target="_blank"
        to="/"
        tabIndex={-1}
        className="btn btn-secondary disabled placeholder col-4 text-white"
      >
        
      </Link>
    </div>
  );
};

export default LoadingCard;