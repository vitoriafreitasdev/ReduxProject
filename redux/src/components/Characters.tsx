import useFetch from "../hooks/useFetch";
import "./Characters.css"
interface AmiiboRelease {
  au?: string;
  eu?: string;
  jp?: string;
  na?: string;
}

interface AmiiboItem {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  head: string;
  image: string;
  name: string;
  release: AmiiboRelease;
  tail: string;
  type: string;
}

interface AmiiboResponse {
  amiibo: AmiiboItem[];
}
/*
Ver todos os usuários (dados vindos da API)

Adicionar/remover usuários dos favoritos (armazenados no Redux)

Filtrar e buscar usuários pelo nome

Exibir o total de favoritos

*/
const Characters = () => {
  const { data } = useFetch<AmiiboResponse>(
    "https://www.amiiboapi.com/api/amiibo/?name=mario"
  );

  console.log(data)
  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Lista de Amiibos</h2>
      {data.amiibo.map((d) => (
        <div key={d.character}>
          <p><strong>Série:</strong> {d.amiiboSeries}</p>
          <p><strong>Personagem:</strong> {d.character}</p>
          <img className="img" src={d.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Characters;
