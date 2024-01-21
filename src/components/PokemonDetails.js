import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const PokemonDetails = ({ pokemonId, showModal, handleClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const cleanDescription = (description) => {
    // Remove line breaks and extra spaces
    return description.replace(/\n|\r/g, " ").replace(/\s+/g, " ").trim();
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();

        // Fetch additional details including species
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        // Filter flavor text entries for English language and "red" version
        const redEntries = speciesData.flavor_text_entries.filter(
          (entry) =>
            entry.language.name === "en" && entry.version.name === "red"
        );

        // Use the first entry (you can customize this logic)
        const flavorText =
          redEntries.length > 0
            ? cleanDescription(redEntries[0].flavor_text)
            : "No description available";

        setPokemonDetails({
          ...data,
          species: { ...speciesData, flavor_text: flavorText },
        });
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    if (showModal) {
      fetchPokemonDetails();
    }
  }, [pokemonId, showModal]);

  if (!showModal || !pokemonDetails) {
    return null;
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemonDetails.name}'s Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
        />
        <p>
          HP:{" "}
          {
            pokemonDetails.stats.find((stat) => stat.stat.name === "hp")
              ?.base_stat
          }
        </p>
        <p>
          Attack:{" "}
          {
            pokemonDetails.stats.find((stat) => stat.stat.name === "attack")
              ?.base_stat
          }
        </p>
        <p>
          Defense:{" "}
          {
            pokemonDetails.stats.find((stat) => stat.stat.name === "defense")
              ?.base_stat
          }
        </p>
        <p>
          Special Attack:{" "}
          {
            pokemonDetails.stats.find(
              (stat) => stat.stat.name === "special-attack"
            )?.base_stat
          }
        </p>
        <p>
          Special Defense:{" "}
          {
            pokemonDetails.stats.find(
              (stat) => stat.stat.name === "special-defense"
            )?.base_stat
          }
        </p>
        <p>
          Speed:{" "}
          {
            pokemonDetails.stats.find((stat) => stat.stat.name === "speed")
              ?.base_stat
          }
        </p>
        {/* Add other stats as needed */}
        <p>Description: {pokemonDetails.species.flavor_text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonDetails;
