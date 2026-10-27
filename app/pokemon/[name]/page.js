"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DetalhesPokemon() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function carregar() {
            try {
                const resposta = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );

                if (!resposta.ok) {
                    throw new Error("Falha ao buscar Pokémon");
                }

                const dados = await resposta.json();
                setPokemon(dados);
            } catch (erro) {
                console.error(erro);
            }
        }

        carregar();
    }, [name]);

    if (!pokemon) {
        return <p className="aviso">Carregando...</p>;
    }

    const altura = (pokemon.height / 10).toFixed(1).replace(".", ",");
    const peso = (pokemon.weight / 10).toFixed(1).replace(".", ",");
    return (
        <main className="detalhes">
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <p>Número: #{pokemon.id}</p>
            <p>Altura: {altura} m</p>
            <p>Peso: {peso} kg</p>
            <h2>Tipos</h2>
            <ul>
                {pokemon.types.map((item) => (
                    <li key={item.type.name}>{item.type.name}</li>
                ))}
            </ul>

            <h2>Habilidades</h2>
            <ul>
                {pokemon.abilities.map((item) => (
                    <li key={item.ability.name}>{item.ability.name}</li>
                ))}
            </ul>

            <h2>Estatísticas</h2>
            <ul>
                {pokemon.stats.map((item) => (
                    <li key={item.stat.name}>
                        {item.stat.name}: {item.base_stat}
                    </li>
                ))}
            </ul>

            <Link href="/pokemon" className="botao">
                Voltar para a lista
            </Link>
        </main>
    );
}