import React from 'react';
import "./Card.css"

export function Card({imageURL}) {
  return (
    <div>
      <div className="CardImg">
        <img src={imageURL} alt="#" />
      </div>
    </div>
  );
};
