import React from "react";
import { Link } from "react-router-dom";
import { SearchResult } from "../../types";
import Game from "../details/Game";

interface SearchItemProps {
  s: SearchResult;
}

const SearchItem: React.FC<SearchItemProps> = ({ s }) => {
  let sId = "";
  let itemType = "";
  if (s.game) {
    sId = `games/${s.game}`;
    itemType = "Game";
  } else if (s.platform) {
    sId = `platforms/${s.platform}`;
    itemType = "Platform";
  } else if (s.character) {
    sId = `characters/${s.character}`;
    itemType = "Character";
  } else if (s.collection) {
    sId = `collections/${s.collection}`;
    itemType = "Collection";
  }

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
        to={`/details/${sId}`}
      >
        {sId && <small className="">{itemType}</small>}
        <h4>{s.name}</h4>
      </Link>
    </>
  );
};

export default SearchItem;
