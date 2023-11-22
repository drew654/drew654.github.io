import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokedexHome = () => {
  const pageSize = 20;
  const pokedexSize = 1017;
  const [pokemons, setPokemons] = useState(Array(pokedexSize).fill(null));
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadPokemons = async () => {
      const response = await P.getPokemonsList({ limit: pageSize, offset: offset });
      const pokemonData = await Promise.all(response.results.map(async pokemon => {
        const number = pokemon.url.split('/')[6];
        const pokemonInfo = await P.getPokemonByName(number);
        const types = pokemonInfo.types.map(type => type.type.name);
        return { name: pokemon.name, number, types };
      }));
      setPokemons(prev => prev.map((item, index) => pokemonData.find(pokemon => pokemon.number - 1 === index) || item));
      if (offset < pokedexSize) {
        setOffset(offset + pageSize);
      }
    };
  
    loadPokemons();
  }, [offset]);

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemons.map((pokemon, index) => pokemon ? <PokemonCard key={index} pokemon={pokemon} /> : <PokemonCard key={index} pokemon={{number: index + 1}} />)}
      </ul>
    </div>
  );
}

export default PokedexHome;