import React from "react";
//import "../styles/PokemonCardStyles.css";

const PokemonCard = ({ id, name, spriteUrl }) => {
  // Capitalize the Pokemon's name
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const cardIdStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "5px",
  };

  return (
    <div className="col-lg-2 col-md-4 col-sm-12 mb-4">
      <div className="card rounded">
        {/* Display Pokemon ID in the top left corner */}
        <div style={cardIdStyle}>{id}</div>

        <img src={spriteUrl} alt={name} className="card-img-top" />
        <div className="card-body d-flex flex-column align-items-center justify-content-end">
          {/* Display capitalized Pokemon name */}
          <p className="card-text">{capitalizedName}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
