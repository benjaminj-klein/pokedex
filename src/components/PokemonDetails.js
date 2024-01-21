import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-plugin-datalabels";

const PokemonDetails = ({ pokemonId, showModal, handleClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const cleanDescription = (description) => {
    return description.replace(/\n|\r/g, " ").replace(/\s+/g, " ").trim();
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const redEntries = speciesData.flavor_text_entries.filter(
          (entry) =>
            entry.language.name === "en" && entry.version.name === "red"
        );

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
        <Modal.Title>
          {capitalizeFirstLetter(pokemonDetails.name)}'s Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            onLoad={() => window.dispatchEvent(new Event("resize"))}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <div
            style={{
              width: "100%",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Bar
              data={{
                labels: [
                  "HP",
                  "Attack",
                  "Defense",
                  "Special Attack",
                  "Special Defense",
                  "Speed",
                ],
                datasets: [
                  {
                    label: "Base Stat",
                    data: [
                      pokemonDetails.stats.find(
                        (stat) => stat.stat.name === "hp"
                      )?.base_stat || 0,
                      pokemonDetails.stats.find(
                        (stat) => stat.stat.name === "attack"
                      )?.base_stat || 0,
                      pokemonDetails.stats.find(
                        (stat) => stat.stat.name === "defense"
                      )?.base_stat || 0,
                      pokemonDetails.stats.find(
                        (stat) => stat.stat.name === "special-attack"
                      )?.base_stat || 0,
                      pokemonDetails.stats.find(
                        (stat) => stat.stat.name === "special-defense"
                      )?.base_stat || 0,
                      pokemonDetails.stats.find(
                        (stat) => stat.stat.name === "speed"
                      )?.base_stat || 0,
                    ],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                scales: {
                  x: {
                    beginAtZero: true,
                    max: 150,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  datalabels: {
                    anchor: "end",
                    align: "end",
                    color: "black",
                    font: {
                      weight: "bold",
                    },
                    formatter: (value, context) =>
                      context.dataset.label + ": " + value,
                  },
                  tooltips: {
                    enabled: false,
                  },
                },
              }}
            />
          </div>

          <div
            style={{ width: "100%", border: "1px solid #ccc", padding: "10px" }}
          >
            <p>Description: {pokemonDetails.species.flavor_text}</p>
          </div>
        </div>
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
