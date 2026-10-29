export default function Pagination({ pagina, onAnterior, onProxima }) {
  return (
    <div className="paginacao">
      <button
        className="botao"
        onClick={onAnterior}
        disabled={pagina === 1}
      >
        ← Anterior
      </button>

      <span>Página {pagina}</span>

      <button className="botao" onClick={onProxima}>
        Próxima →
      </button>
    </div>
  );
}