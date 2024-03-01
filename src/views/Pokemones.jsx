import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pokemones = () => {
  const [pokemones, setPokemones] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState("");
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const navigate = useNavigate();

  const getApi = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await response.json();

    // console.log("data completa: ",data)
    //se accede al array de objetos "results" dentro de data

    const { results } = data;
    //const results = data.results;
    //console.log("Variable result: ",results)

    const newPokemones = results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const detallePokemon = await res.json();
      //console.log("detallePokemon: ",detallePokemon)

      return {
        id: detallePokemon.id,
        name: detallePokemon.name,
        // img_officialArtwork:
        //   detallePokemon.sprites.other["official-artwork"].front_default,
        //  img_dreamWorld: detallePokemon.sprites.other.dream_world.front_default,
        //imagen 3d
        //  img_home: detallePokemon.sprites.other.home.front_default,
        // img_backDefault: detallePokemon.sprites.back_default,
        //  img_frontDefault: detallePokemon.sprites.front_default,
        
        //animado
        img_showDownFrontDefault: detallePokemon.sprites.other.showdown.front_default,
        // img_showDownBackDefault: detallePokemon.sprites.other.showdown.back_default,
      };
    });

    //console.log("4to log:", await Promise.all(newPokemones))
    setPokemones(await Promise.all(newPokemones));
  };

  //obtener el pokemon seleccionado
  const getPokemonDetails = async (pokemonName) => {
    const selectedPokemon = pokemones.find(pokemon => pokemon.name === pokemonName);
    setSelectedPokemonDetails(selectedPokemon);
  };

  //función para le REDIRECCIÓN PROGRAMÁTICA
  const goToPokemonDetail = async () => {
    if (pokemonSelected) navigate(`/pokemones/${pokemonSelected}`);
    else alert("Debe seleccionar un pokemon");
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (pokemonSelected) {
      getPokemonDetails(pokemonSelected);
    } else {
      setSelectedPokemonDetails(null);
    }
  }, [pokemonSelected]);

  return (
    <div className="mt-5 d-flex flex-column gap-3 align-items-center">
      <h1>Selecciona un Pokémon</h1>
      <DropdownButton title="Pokemones" variant="outline-dark"
      onSelect={(eventKey) => setPokemonSelected(eventKey)}>

        <Dropdown.Item disabled className="text-center">Elige un Pokémon</Dropdown.Item>

        {pokemones.map((pokemon) => (
          <Dropdown.Item key={pokemon.id} eventKey={pokemon.name} className="text-center">
            <img src={pokemon.img_showDownFrontDefault} alt={pokemon.name} />
            <h3 className="namesList">{pokemon.name}</h3>
          </Dropdown.Item>
        ))}

      </DropdownButton>

      {selectedPokemonDetails && (
        <div className="text-center text-capitalize">
          <h2>{selectedPokemonDetails.name}</h2>
          <img src={selectedPokemonDetails.img_showDownFrontDefault} alt={selectedPokemonDetails.name} />
        </div>
      )}      

      <Button variant="dark" className="btn btn-dark"
      onClick={goToPokemonDetail}>Ver detalles</Button>
    </div>
  );
};

export default Pokemones;
