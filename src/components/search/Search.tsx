import React, { useEffect, useState } from "react";
import CharacterItem from "./CharacterItem";
import { useDispatch, useSelector } from "react-redux";
import { getGamesWithKeywordThunk } from "../../services/gamesThunks";
import { Game } from "../../types";
import { AppDispatch } from "../../redux/Store";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  // let isSearch = false;
  const dispatch = useDispatch<AppDispatch>()
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const {games, loading} = useSelector((state: any) => state.gamesData) 


  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearch(e.target.value);

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSearch(true);
    dispatch(getGamesWithKeywordThunk(search))
    e.preventDefault();
  };

  return (
    <div className="row container m-auto">
      <div className="col-12">
        <div className="container p-0 col-10 col-lg-7 col-xl-5 m-auto rounded-pill bg-black d-flex align-items-center border">
          <i className="bi bi-search text-white d-inline position-absolute ms-3"></i>
          <form onSubmit={searchSubmitHandler} className="w-100 ms-4">
            <input
              type="text"
              className="text-white form-control rounded-pill form-control-lg border-0 d-inline shadow-none bg-black"
              id="search"
              placeholder="Search Playbook"
              value={search}
              onChange={searchChangeHandler}
            />
            <button type="submit" className="d-none"></button>
          </form>
        </div>
      </div>

      {/* <p>{games}</p> */}

    </div>
  );
};

export default Search;
