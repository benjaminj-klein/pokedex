import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //fetch data from pokeapi
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

  // Filtered Pokemon list based on the search term
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      {/* Bootstrap Navbar with Search Bar and Dropdown */}
      <Navbar bg="danger" variant="dark">
        <Container fluid className="px-5">
          <Navbar.Brand href="#home" style={{ color: "white" }}>
            Pokedex
          </Navbar.Brand>
          <NavDropdown
            title={<span style={{ color: "white" }}>Select Generation</span>}
            id="basic-nav-dropdown"
            className="ml-auto"
          >
            <NavDropdown.Item href="#generation1">
              Generation 1
            </NavDropdown.Item>
            {/* ... other dropdown items ... */}
          </NavDropdown>

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Container>
      </Navbar>

      {/* Container for PokemonCards */}
      <div className="container-fluid mt-3 px-5">
        <div className="row">
          {filteredPokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              spriteUrl={pokemon.sprites.front_default}
              types={pokemon.types.map((type) => type.type.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
