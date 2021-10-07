import React from 'react';

export const BreedImage = ({img, label, onClick}) => {
    return (
        <div className="image-wrapper" onClick={onClick}>
            <img src={img} alt={label} />
        </div>
    );
};
