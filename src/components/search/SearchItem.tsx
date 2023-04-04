import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Game, Platform, SearchResult } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  findGameByIdThunk,
  findPlatformByIdThunk,
} from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";

interface SearchItemProps {
  s: SearchResult;
  type: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ s, type }) => {
  let id: string = "";
  let item;

  if (type === "game") {
    const { games, loading } = useSelector((state: any) => state.gamesData);
    const game: Game = games.filter((g: Game) => {
      return g.id === s.game;
    })[0];
    id = `games/${s.game}`;
    item = game;
  }
  // else if (type === "platform") {
  //   const { platforms, loading } = useSelector(
  //     (state: any) => state.platformsData
  //   );
  //   const platform: Platform = platforms.filter((p: Platform) => {
  //     return p.id === s.platform;
  //   })[0];
  //   id = `platforms/${s.platform}`;
  //   item = platform;
  // }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (type === "game") dispatch(findGameByIdThunk(Number(s.game)));
    // else if (type === "platform")
    //   dispatch(findPlatformByIdThunk(Number(s.platform)));
  }, []);

  return (
    <div className="card col-5 col-sm-4 col-lg-3 col-xxl-2 wb-search-item m-3 p-2">
      {/* {item?.cover && ( */}
      <img
        src={
          item?.cover &&
          `https://images.igdb.com/igdb/image/upload/t_cover_big/${
            item?.cover.split("/")[7]
          }`
        }
        height="300px"
        // width="50px"
        className="card-img-top"
        // alt="game cover"
      />
      {/* )} */}
      <div className="card-body">
        <h5 className="card-title">{item?.name}</h5>
        {/* <p className="card-text text-truncate overflow-scroll">{item?.storyline}</p> */}
        <Link
          target="_blank"
          to={`/details/${id}`}
          className="btn btn-secondary text-white"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
