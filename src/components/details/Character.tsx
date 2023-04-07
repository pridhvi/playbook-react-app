import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Character, Game } from "../../types";
import { findCharacterById } from "../../services/igdbServices";

interface CharacterProps {}

const CharacterComponent: React.FC<CharacterProps> = ({}) => {
  const { pathname } = useLocation();
  const characterId: number = Number(pathname.split("/")[3]);
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    fetchCharacter();
  }, []);
  const fetchCharacter = async () => {
    setCharacter(await findCharacterById(characterId));
  };

  return (
    <div className="container">
      {/* {loading ? <LoadingSpinner /> : null} */}
      {character ? (
        <>
          <h1>{character.name}</h1>
          {character.mug_shot && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                character.mug_shot?.url.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}

          <h3 className="">Games: </h3>
          {character.games.map((g: Game) => (
            <p key={g.id}>{g.name}</p>
          ))}
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
