import React from "react";
import PropTypes from "prop-types";

export const BreedImage = ({ imgUrl, label, onClick }) => {
  return (
    <div className="image-wrapper" onClick={onClick}>
      <img src={imgUrl} alt={label} />
    </div>
  );
};

BreedImage.propTypes = {
  onClick: PropTypes.func,
  imgUrl: PropTypes.string,
  label: PropTypes.string,
};
