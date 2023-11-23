import React, { useState } from 'react';
import { useEffect } from 'react';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonFlashCards = () => {
  const [gameState, setGameState] = useState('waiting to start');
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [typeSelection, setTypeSelection] = useState([]);

  const TypeButton = (type) => (
    <div
      key={type.id}
      style={{
        textAlign: 'center',
        border: 'solid',
        padding: '0.1em',
        margin: '0.1em',
        cursor: 'pointer',
        backgroundColor: typeSelection.includes(type.name) ? (currentPokemon?.types.includes(type.name) ? 'green' : 'gray') : 'white',
        userSelect: 'none',
      }}
      onClick={() => {
        if (!typeSelection.includes(type.name)) {
          setTypeSelection([...typeSelection, type.name]);
        }
      }}
    >
      {type.name}
    </div>
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await P.getPokemonsList();
      const pokemonNames = response.results.map((pokemon) => pokemon.name);
      setPokemons(pokemonNames);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await P.getTypesList();
      const types = response.results.map((type) => ({ name: type.name, id: type.url.split('/')[6] })).filter((type) => type.id < 10000);
      setTypes(types);
    };

    fetchTypes();
  }, []);

  const getRandomPokemon = async () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const pokemonName = pokemons[randomIndex];
    const pokemonData = await P.getPokemonByName(pokemonName);
    return { name: pokemonName, image: pokemonData.sprites.front_default, types: pokemonData.types.map((type) => type.type.name) };
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      {gameState === 'waiting to start' && (
        <div
          onClick={() => {
            setGameState('showing pokemon');
            getRandomPokemon().then((pokemon) => setCurrentPokemon(pokemon));
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '4em',
            width: '12em',
            fontSize: '2rem',
            cursor: 'pointer',
            border: '1px solid black',
          }}
        >Start</div>
      )}
      {gameState === 'showing pokemon' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '2rem',
          }}
        >
          <h1>{(currentPokemon?.name)}</h1>
            <img src={currentPokemon?.image} alt={currentPokemon?.name} style={{ width: '6em', height: '6em' }} />
            <table>
            <tr>
              <td>
                {types.map((type) => (type.id % 3 === 0 && <TypeButton key={type.id} {...type} />))}
              </td>
              <td>
                {types.map((type) => (type.id % 3 === 1 && <TypeButton key={type.id} {...type} />))}
              </td>
              <td>
                {types.map((type) => (type.id % 3 === 2 && <TypeButton key={type.id} {...type} />))}
              </td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
};

export default PokemonFlashCards;