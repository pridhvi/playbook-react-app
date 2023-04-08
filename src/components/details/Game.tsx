import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import { Game } from "../../types";
import { findGameById } from "../../services/igdbServices";

interface GameProps {}

const GameComponent: React.FC<GameProps> = ({}) => {
  const { pathname } = useLocation();
  const gameId: number = Number(pathname.split("/")[3]);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    setGame(await findGameById(gameId));
  };

  return (
    <div className="container">
      {game ? (
        <>
          <h1>{game.name}</h1>
          {game.cover && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                game.cover?.url.split("/")[7]
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
      ) : <LoadingSpinner />}
    </div>
  );
};

export default GameComponent;
