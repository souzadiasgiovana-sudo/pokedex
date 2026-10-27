"use client";
import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";

export default function ListaPokemon() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
        );

        if (!resposta.ok) {
          throw new Error("Falha ao buscar Pokémon");
        }

        const dados = await resposta.json();
        setPokemons(dados.results);
      } catch (erro) {
        console.error(erro);
      }
    }

    carregar();
  }, []);

  return (
    <main className="pagina">
      <h1>Pokémon</h1>

      <div className="grade">
        {pokemons.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <PokemonCard
              key={pokemon.name}
              nome={pokemon.name}
              id={id}
              imagem={imagem}
            />
          );
        })}
      </div>
    </main>
  );
}