import React from "react";
//import "../styles/PokemonCardStyles.css";

const PokemonCard = ({ id, name, spriteUrl }) => {
  return (
    <div className="col-lg-2 col-md-4 col-sm-12 mb-4">
      <div className="card rounded">
        <img src={spriteUrl} alt={name} className="card-img-top" />
        <div className="card-body">
          <p className="card-text">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
