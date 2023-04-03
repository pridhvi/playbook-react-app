import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Game, SearchResult } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { findGameByIdThunk } from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";

interface SearchItemProps {
  s: SearchResult;
  type: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ s, type }) => {
// console.log("TESTTTT")
  let id: string = "";
  let item;
  
  if(type === "game") {
    const {games, loading} = useSelector((state: any) => state.gamesData);
    const game: Game = games.filter((g: Game) => {
      return g.id === s.game;
    })[0];
    id = `games/${s.game}`;
    item = game;
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (type === "game") dispatch(findGameByIdThunk(Number(s.game)));
  }, []);

  return (
    <>
      <Link
        target="_blank"
        className={`col-2 wb-search-item wb-rounded-border border text-decoration-none text-white m-2 
        ${s.game && "bg-success"} ${s.character && "bg-warning"} ${
          s.platform && "bg-danger"
        } 
        ${s.collection && "bg-secondary"}
      `}
        to={`/details/${id}`}
      >
        {id && <small className="">{type}</small>}
        <h4>{item?.name}</h4>
      </Link>
    </>
  );
};

export default SearchItem;
