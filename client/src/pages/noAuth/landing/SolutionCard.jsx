import React from 'react';

const SolutionCard = ({ image, title, description }) => {
    return (
        <div className="solution-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default SolutionCard;