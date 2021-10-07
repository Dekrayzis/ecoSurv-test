import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button className="form-button" >
      {label}
    </button>
  );
};

export default Button;
