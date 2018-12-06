import React from 'react';

const Card = ({ name, address, postcode, city, text }) => {
  return (
  <div className="card scale-up-center">
    <div className="card-body">
      <h5 className="card-title">{name}, {city}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{address}{postcode.length > 1 ? ', ' : ''} {postcode}</h6>
      <p className="card-text">{text}</p>
    </div>
  </div>
  );
}

export default Card;