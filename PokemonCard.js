import Link from "next/link";

export default function PokemonCard({ nome, id, imagem }) {
  return (
    <Link href={`/pokemon/${nome}`} className="card">
      <img src={imagem} alt={nome} />
      <h2>{nome}</h2>
      <p>#{id}</p>
    </Link>
  );
}