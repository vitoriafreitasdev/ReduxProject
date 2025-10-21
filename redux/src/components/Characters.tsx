
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useSelector, useDispatch } from "react-redux";
import "./Characters.css"
import type { RootState } from "../state/store";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../state/store";
import { addToFavorites, apiData, deleteOfFavorites } from "../state/characters/characterSlice";

/*
Ver todos os usuários (dados vindos da API)

Adicionar/remover usuários dos favoritos (armazenados no Redux)

Exibir o total de favoritos

*/
const Characters = () => {
  

  const data = useSelector((state: RootState) => state.character.users )
  const favoritos = useSelector((state: RootState) => state.character.favoritesCharacters )
  const loading = useSelector((state: RootState) => state.character.loading)
  const totalOfFavs = useSelector((state: RootState) => state.character.totalOfFavs)
  const [showFavs, setShowFavs] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loadData = () => {
      dispatch(apiData("https://www.amiiboapi.com/api/amiibo/?name=mario"))
    }

    loadData()
   
  }, [dispatch])

  if (loading) return <div className="loading-div">Carregando...</div>

  // Fazer => filtrar e buscar usuários pelo nome

  return (
    <div className="main-div">
      <h1>Personagens</h1>
      <div className="search-div">
        <input type="text" placeholder="Buscar pelo nome" className="search-input"/>
        <button className="search-btn">Procurar</button>
      </div>
      <button onClick={() => setShowFavs(!showFavs)} className="showFavsbBtn">Mostrar favoritos</button>
      {showFavs &&  <div className="favs-container">
        <p>Total de favoritos: {totalOfFavs}</p>
        {favoritos.length > 0 ? favoritos.map((f) => (
          <div key={f.tail + f.head} className="favs-card">
            <p><strong>Série:</strong> {f.amiiboSeries}</p>
            <p><strong>Personagem:</strong> {f.character}</p>
            <img className="img" src={f.image} alt="" /><p></p>
            <button className="delete" onClick={() => dispatch(deleteOfFavorites(f))}>Tirar</button>
          </div>
        )) : <div>Não tem favoritos adicionados</div>}
      </div> }
      <div className="characters-main-container">
        {data && data?.amiibo?.map((d) => (
        <div key={d.tail + d.head} className="characters-card"> 
          <p><strong>Série:</strong> {d.amiiboSeries}</p>
          <p><strong>Personagem:</strong> {d.character}</p>
          <img className="img" src={d.image} alt="" />
          <button onClick={() => dispatch(addToFavorites(d))} className="btn">Adicionar aos favoritos</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Characters;
