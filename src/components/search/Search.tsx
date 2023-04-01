import React, { useEffect, useState } from "react";
import {
  useGetAllCharactersQuery,
  useGetCharacterByNameQuery,
} from "../../services/iceandfire";
import { Character } from "../../types";
import CharacterItem from "./CharacterItem";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  // let isSearch = false;
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const { data: allCharacters } = useGetAllCharactersQuery(page);

  const [search, setSearch] = useState<string>("");

  const { data: characterSearch = [] } = useGetCharacterByNameQuery(search);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearch(e.target.value);

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSearch(true);
    characterSearch.map((c: Character) => console.log(c.name));
    e.preventDefault();
  };

  return (
    <div className="row container m-auto">
      <div className="col-12">
        <div className="container col-10 col-lg-7 col-xl-5 m-auto rounded-pill bg-black d-flex align-items-center border">
          <i className="bi bi-search text-white d-inline position-absolute ms-1"></i>
          <form onSubmit={searchSubmitHandler}>
            <input
              type="text"
              className="text-white form-control rounded-pill form-control-lg border-0 d-inline ms-3 shadow-none bg-black"
              id="search"
              placeholder="Search Websteros"
              value={search}
              onChange={searchChangeHandler}
            />
            <button type="submit" className="d-none"></button>
          </form>
        </div>
      </div>

      {/* {!isSearch && ( */}
      <div className="mt-5 col-12 col-md-10 col-lg-10 container bg-black wb-rounded-border bg-opacity-75">
        <h1 className="">Characters</h1>
        <div className="row d-flex justify-content-center">
          {allCharacters?.map((character: Character) => {
            const characterId =
              character?.url.split("/")[4] + "/" + character?.url.split("/")[5];
            return (
              character.name && (
                <CharacterItem key={characterId} id={characterId} />
              )
            );
          })}
          <button onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Search;
