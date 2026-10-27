"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPokemon() {
    const [busca, setBusca] = useState("");
    const [mensagem, setMensagem] = useState("");
    const router = useRouter();
    async function buscar(evento) {
        evento.preventDefault();

        const nome = busca.trim().toLowerCase();

        if (nome === "") {
            setMensagem("Digite o nome de um Pokémon.");
            return;
        }

        try {
            const resposta = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${nome}`
            );

            if (!resposta.ok) {
                setMensagem("Pokémon não encontrado.");
                return;
            }

            setMensagem("");
            router.push(`/pokemon/${nome}`);
        } catch (erro) {
            setMensagem("Não foi possível carregar os Pokémon. Tente novamente.");
        }
    }
    return (
        <div className="busca-area">
            <form className="busca" onSubmit={buscar}>
                <input
                    type="text"
                    placeholder="Digite o nome do Pokémon"
                    value={busca}
                    onChange={(evento) => setBusca(evento.target.value)}
                />
                <button type="submit" className="botao">
                    Buscar
                </button>
            </form>

            {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
    );
}