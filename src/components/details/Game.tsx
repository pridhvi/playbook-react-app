import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { findGameByIdThunk } from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";
import LoadingSpinner from "../Loading";

interface GameProps {}

const Game: React.FC<GameProps> = ({}) => {
  const { pathname } = useLocation();
  const gameId = pathname.split("/")[3];
  const { game, loading } = useSelector((state: any) => state.gameData);
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
          <img src={`https:${game.cover}`} height="250px" alt="cover" />
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

export default Game;
