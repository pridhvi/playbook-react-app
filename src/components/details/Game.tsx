import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { findGameByIdThunk } from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";
import LoadingSpinner from "../LoadingSpinner";
import { Game } from "../../types";

interface GameProps {}

const GameComponent: React.FC<GameProps> = ({}) => {
  const { pathname } = useLocation();
  const gameId: number = Number(pathname.split("/")[3]);
  const { games, loading } = useSelector((state: any) => state.gamesData);
  const [game, setGame] = useState<Game>();

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(findGameByIdThunk(gameId));
  }, []);

  useEffect(() => {
    setGame(
      games.filter((g: Game) => {
        return g.id === gameId;
      })[0]
    );
  }, [games]);

  return (
    <div className="container">
      {loading ? <LoadingSpinner /> : null}
      {game ? (
        <>
          <h1>{game.name}</h1>
          {game.cover && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                game.cover.url.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}

          {game.platformsNames ? (
            <>
              <h3 className="">Platforms: </h3>
              <p>{game.platformsNames}</p>
            </>
          ) : null}
          {game.storyline ? (
            <>
              <h3>Storyline: </h3>
              <p>{game.storyline}</p>
            </>
          ) : null}
          {game.summary ? (
            <>
              <h3>Summary: </h3>
              <p>{game.summary}</p>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default GameComponent;
