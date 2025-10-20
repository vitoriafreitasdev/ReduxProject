
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useSelector, useDispatch } from "react-redux";
import "./Characters.css"
import type { RootState } from "../state/store";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../state/store";
import { addToFavorites, apiData } from "../state/characters/characterSlice";

/*
Ver todos os usuários (dados vindos da API)

Adicionar/remover usuários dos favoritos (armazenados no Redux)

Filtrar e buscar usuários pelo nome

Exibir o total de favoritos

*/
const Characters = () => {
  

  const data = useSelector((state: RootState) => state.character.users )
  const favoritos = useSelector((state: RootState) => state.character.favoritesCharacters )
  const loading = useSelector((state: RootState) => state.character.loading)
  const [showFavs, setShowFavs] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loadData = () => {
      dispatch(apiData("https://www.amiiboapi.com/api/amiibo/?name=mario"))
    }

    loadData()
   
  }, [])


  if (loading) return <div>Carregando</div>

  // fazer o de tirar favoritos.

  return (
    <div>
      <h2>Personagens</h2>
      <button onClick={() => setShowFavs(!showFavs)}>Mostrar favoritos</button>
      {showFavs &&  <div>
        {favoritos.length > 0 ? favoritos.map((f) => (
          <div key={f.tail + f.head}>
              <p><strong>Série:</strong> {f.amiiboSeries}</p>
            <p><strong>Personagem:</strong> {f.character}</p>
            <img className="img" src={f.image} alt="" /><p></p>
          </div>
        )) : <div>Não tem favoritos adicionados</div>}
      </div> }
      {data && data?.amiibo?.map((d) => (
        <div key={d.tail + d.head}>
          <p><strong>Série:</strong> {d.amiiboSeries}</p>
          <p><strong>Personagem:</strong> {d.character}</p>
          <img className="img" src={d.image} alt="" />
          <button onClick={() => dispatch(addToFavorites(d))}>Adicionar aos favoritos</button>
        </div>
      ))}
    </div>
  );
};

export default Characters;
