import React, { useState, useEffect } from "react";
//import "../styles/PokemonCardStyles.css";

const PokemonCard = ({ id, name, spriteUrl, types }) => {
  // Capitalize the Pokemon's name
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Determine background color based on types
  const backgroundColor = getBackgroundColor(types);

  const cardIdStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "5px",
  };

  const cardStyle = {
    background: backgroundColor,
  };

  function getBackgroundColor(types) {
    if (types && types.length === 1) {
      // If the Pokemon has only one type, use a solid color matching the type
      return getTypeColor(types[0]);
    } else if (types && types.length === 2) {
      // If the Pokemon has two types, use a gradient of both type colors
      const gradient = `linear-gradient(to right, ${getTypeColor(
        types[0]
      )}, ${getTypeColor(types[1])})`;
      return gradient;
    } else {
      // Default background color if no type information is available
      return "#fff";
    }
  }

  function getTypeColor(type) {
    // Map Pokemon types to colors (you can customize this)
    const typeColors = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    };

    return typeColors[type] || "#fff"; // Default to white if type color is not found
  }

  return (
    <div className="col-lg-2 col-md-4 col-sm-12 mb-4">
      <div className="card rounded" style={cardStyle}>
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
