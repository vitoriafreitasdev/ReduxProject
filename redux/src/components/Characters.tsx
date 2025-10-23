

import { useSelector, useDispatch } from "react-redux";
import "./Characters.css"
import type { RootState } from "../state/store";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../state/store";
import { addToFavorites, apiData, deleteOfFavorites, filterData } from "../state/characters/characterSlice";

const Characters = () => {
  const data = useSelector((state: RootState) => state.character.users )
  const favoritos = useSelector((state: RootState) => state.character.favoritesCharacters )
  const loading = useSelector((state: RootState) => state.character.loading)
  const totalOfFavs = useSelector((state: RootState) => state.character.totalOfFavs)
  const filter = useSelector((state: RootState) => state.character.filter)
  const [searchBar, setSearchBar] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [showFavs, setShowFavs] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loadData = () => {
      dispatch(apiData("https://www.amiiboapi.com/api/amiibo/?name=mario"))

    }

    loadData()
   
  }, [dispatch])

  if (loading) return <div className="loading-div">Carregando...</div>
  


  // Para pesquisar com a tecla "Enter"
const searchWithKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    setSearch(searchBar)
    dispatch(filterData(e.currentTarget.value))
  }
}

  // Para pesquisar apertando no botão
  const searchBtn = (character: string) => {
    setSearch(character)
    dispatch(filterData(character))

  }
  
  return (
    <div className="main-div">
      <h1>Personagens</h1>
      <div className="search-div">
        <input onChange={(e) => setSearchBar(e.target.value)} onKeyDown={searchWithKey} type="text" placeholder="Buscar pelo nome" className="search-input"/>
        <button className="search-btn"  onClick={() => searchBtn(searchBar)}>Procurar</button>
      </div>
      <button onClick={() => setShowFavs(!showFavs)} className="showFavsbBtn">Mostrar favoritos</button>
      {/* Para mostrar favoritos adicionados */}
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
      {/* Personagens vindo da API, se o usuário não digitar nada para procurar, mostra todos, se tiver digitado algo mostrará os que ele digito */}
      <div className="characters-main-container">
        {data && search.length === 0 ? data?.amiibo?.map((d) => (
        <div key={d.tail + d.head} className="characters-card"> 
          <p><strong>Série:</strong> {d.amiiboSeries}</p>
          <p><strong>Personagem:</strong> {d.character}</p>
          <p><strong>Nome:</strong> {d.name}</p>
          <img className="img" src={d.image} alt="" />
          <button onClick={() => dispatch(addToFavorites(d))} className="btn">Adicionar aos favoritos</button>
        </div>
      )) : filter?.map((d) => (
        <div key={d.tail + d.head} className={d.name.includes(search) ? "characters-card" : ""}>
           <>
            <p><strong>Série:</strong> {d.amiiboSeries}</p>
            <p><strong>Personagem:</strong> {d.character}</p>
            <p><strong>Nome:</strong> {d.name}</p>
            <img className="img" src={d.image} alt="" />
            <button onClick={() => dispatch(addToFavorites(d))} className="btn">Adicionar aos favoritos</button>
          </> 
        </div>
      ))}
      </div>
    </div>
  );
};

export default Characters;
