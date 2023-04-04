import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  findCharacterByIdThunk,
  findGameByIdThunk,
} from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";
import LoadingSpinner from "../LoadingSpinner";
import { Character, Game } from "../../types";
import SearchItem from "../search/SearchItem";

interface CharacterProps {}

const CharacterComponent: React.FC<CharacterProps> = ({}) => {
  const { pathname } = useLocation();
  const characterId: number = Number(pathname.split("/")[3]);
  const { characters, loading } = useSelector(
    (state: any) => state.charactersData
  );
  const [character, setCharacter] = useState<Character>();
  const { games, loading: gamesLoading } = useSelector(
    (state: any) => state.gamesData
  );

  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   console.log("TEST")
  // }, [games]);

  useEffect(() => {
    dispatch(findCharacterByIdThunk(characterId));
  }, []);

  useEffect(() => {
    setCharacter(
      characters.filter((c: Character) => {
        return c.id === characterId;
      })[0]
    );

    if (character?.games) {
      character?.games.map((g: number) => {
        dispatch(findGameByIdThunk(g));
      });
    }
  }, [characters]);

  return (
    <div className="container">
      {loading ? <LoadingSpinner /> : null}
      {character ? (
        <>
          <h1>{character.name}</h1>
          {character.mug_shot && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                character.mug_shot.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}

          <h3 className="">Games: </h3>
          {games.map((g: Game) => <p key={g.id}>{g.name}</p>)}
          {character.description ? (
            <>
              <h3>Description: </h3>
              <p>{character.description}</p>
            </>
          ) : null}
          {character.country_name ? (
            <>
              <h3>Country: </h3>
              <p>{character.country_name}</p>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default CharacterComponent;
