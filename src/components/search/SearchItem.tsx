import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Character, Game, SearchResult } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  findCharacterByIdThunk,
  findGameByIdThunk,
} from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";
import LoadingCard from "../LoadingCard";

interface SearchItemProps {
  s: SearchResult;
  type: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ s, type }) => {
  let id: string = "";
  let item,
    isLoading = true,
    picture = "",
    description = "";

  if (type === "game") {
    const { games, loading } = useSelector((state: any) => state.gamesData);
    const game: Game = games.filter((g: Game) => {
      return g.id === s.game;
    })[0];
    id = `games/${s.game}`;
    item = game;
    if (game?.cover) picture = game?.cover;
    if (game?.summary) description = game?.summary;
    isLoading = loading;
  } else if (type === "character") {
    const { characters, loading } = useSelector(
      (state: any) => state.charactersData
    );
    const character: Character = characters.filter((c: Character) => {
      return c.id === s.character;
    })[0];
    id = `characters/${s.character}`;
    item = character;
    if (character?.mug_shot) picture = character?.mug_shot;
    if (character?.description) description = character?.description;
    isLoading = loading;
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (type === "game" && s.game) dispatch(findGameByIdThunk(s.game));
    else if (type === "character" && s.character)
      dispatch(findCharacterByIdThunk(s.character));
  }, []);

  return (
    <div className="card col-5 col-sm-4 col-lg-3 col-xxl-2 wb-search-item m-1 m-lg-3 p-1">
      {isLoading ? (
        <LoadingCard />
      ) : (
        <div className="card-body">
          <img
            src={
              picture
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
                    picture.split("/")[7]
                  }`
                : "/no-image.jpeg"
            }
            height="300px"
            // width="50px"
            className="card-img-top mb-2"
            alt="cover"
          />
          <h6 className="card-title fw-bold">{item?.name}</h6>
          <p
            className="card-text fw-light fst-italic overflow-scroll"
            style={{ height: "50px" }}
          >
            {description}
          </p>
          <Link
            target="_blank"
            to={`/details/${id}`}
            className="btn btn-secondary text-white"
          >
            Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchItem;
