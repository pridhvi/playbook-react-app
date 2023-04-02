import React from "react";
import { Link } from "react-router-dom";
import { SearchResult } from "../../types";

interface SearchItemProps {
  s: SearchResult;
}

const SearchItem: React.FC<SearchItemProps> = ({ s }) => {
  return (
    <Link
      className={`col-4 wb-search-item wb-rounded-border border text-decoration-none text-white m-2 
        ${s.game && "bg-success"} ${s.character && "bg-warning"} ${s.platform && "bg-danger"} 
        ${s.collection && "bg-secondary"}
      `}
      to={""}
    >
      {s.platform && <small className="">Platform</small>}
      {s.game && <small className="">Game</small>}
      {s.character && <small className="">Character</small>}
      {s.collection && <small className="">Collection</small>}
      <h4>{s.name}</h4>
    </Link>
  );
};

export default SearchItem;
