// App.js

import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            return await detailsResponse.json();
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center">Pokedex</h1>
      <div className="container">
        <div className="row">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              spriteUrl={pokemon.sprites.front_default}
              types={pokemon.types.map((type) => type.type.name)} // Extracting type names
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
