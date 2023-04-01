import React from "react";
import { Character } from "../../types";
import { useGetAllCharactersQuery } from "../../services/iceandfire";
import { Link } from "react-router-dom";

interface CharacterItemProps {
  id: string;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ id }) => {
  const { character } = useGetAllCharactersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      character: data?.find((character) => character?.url.split("/")[4] + "/" + character?.url.split("/")[5] === id),
    }),
  });
  return (
    <Link
      className="col-3 wb-bg-brown wb-rounded-border border text-decoration-none text-white m-2"
      to={`/characters/${character?.url.split("/")[5]}`}
    >
      {character && (
        <div className="">
          <div>
            <h4 className="">{character.name}</h4>
            {character.aliases.length && (
              <small className="text-secondary">{character.aliases[0]}</small>
            )}
          </div>
          {character.culture && <span>{character.culture}</span>}
        </div>
      )}
    </Link>
  );
};

export default CharacterItem;
