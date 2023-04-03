import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { findGameByIdThunk } from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";
import LoadingSpinner from "../Loading";
import { Game } from "../../types";

interface GameProps {}

const GameComponent: React.FC<GameProps> = ({}) => {
  const { pathname } = useLocation();
  const gameId: number = Number(pathname.split("/")[3]);
  console.log("TESTTT");
  const { games, loading } = useSelector((state: any) => state.gamesData);
  const game: Game = games.filter((g: Game) => {
    return g.id === gameId;
  })[0];

  console.log(game);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(findGameByIdThunk(Number(gameId)));
  }, []);

  return (
    <div className="container">
      {loading ? <LoadingSpinner /> : null}
      {game ? (
        <>
          <h1>{game.name}</h1>
          {game.cover && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                game.cover.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}
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
