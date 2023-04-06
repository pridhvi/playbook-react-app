import React from "react";
import { Link } from "react-router-dom";
import { SearchResult } from "../../types";

interface SearchItemProps {
  s: SearchResult;
  type: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ s, type }) => {
  let id: string = "";
  let picture,
    description = "";

  if (type === "game" && s.game) {
    id = `games/${s.game.id}`;
    if (s.game.cover?.url) picture = s.game.cover.url;
    if (s.game.summary) description = s.game.summary;
  } else if (type === "character" && s.character) {
    id = `characters/${s.character.id}`;
    console.log(s.character?.mug_shot);
    if (s.character.mug_shot?.url) picture = s.character?.mug_shot.url;
    if (s.character.description) description = s.character.description;
  }

  return (
    <div className="card col-5 col-sm-4 col-lg-3 col-xxl-2 wb-search-item m-1 m-lg-3 p-1">
      <div className="card-body">
        <img
          src={
            picture
              ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
                  picture?.split("/")[7]
                }`
              : "/no-image.jpeg"
          }
          height="300px"
          // width="50px"
          className="card-img-top mb-2"
          alt="cover"
        />
        <h6 className="card-title fw-bold">{s?.name}</h6>
        <p
          className="card-text fw-light fst-italic overflow-scroll"
          style={{ height: "50px" }}
        >
          {description}
        </p>
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
