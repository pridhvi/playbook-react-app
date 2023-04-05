import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCriteriaThunk } from "../../services/igdbThunks";
import { SearchResult } from "../../types";
import { AppDispatch } from "../../redux/Store";
import SearchItem from "./SearchItem";
import LoadingSpinner from "../LoadingSpinner";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [criteria, setCriteria] = useState<string>("");
  const { searchResult, loading: searchLoading } = useSelector(
    (state: any) => state.searchData
  );
  // const [pageSize, setPageSize] = useState<number>(5);
  const pageSize: number = 10;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isGames, setIsGames] = useState<boolean>(true);
  const [isCharacters, setIsCharacters] = useState<boolean>(false);
  const [isCompanies, setIsCompanies] = useState<boolean>(false);
  const [type, setType] = useState<string>("game");

  useEffect(() => {
    dispatch(searchCriteriaThunk({ type, criteria, pageSize, pageNumber }));
  }, []);

  useEffect(() => {
    dispatch(searchCriteriaThunk({ type, criteria, pageSize, pageNumber }));
  }, [pageNumber, type]);

  const criteriaChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setCriteria(e.target.value);

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (criteria === "") {
      e.preventDefault();
      return;
    }

    if (pageNumber === 0)
      dispatch(searchCriteriaThunk({ type, criteria, pageSize, pageNumber }));
    gamesClickHandler();
    e.preventDefault();
  };

  const gamesClickHandler = () => {
    setIsGames(true);
    setIsCharacters(false);
    setIsCompanies(false);
    setType("game");
    setPageNumber(0);
  };

  const charactersClickHandler = () => {
    setIsGames(false);
    setIsCharacters(true);
    setIsCompanies(false);
    setType("character");
    setPageNumber(0);
  };

  const companiesClickHandler = () => {
    setIsGames(false);
    setIsCharacters(false);
    setIsCompanies(true);
    setType("company");
    setPageNumber(0);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        {/* Search Bar */}
        <div className="col-12 container">
          <div className="container p-0 col-10 col-lg-7 col-xl-5 m-auto rounded-pill bg-black d-flex align-items-center border">
            {/* <i className="bi bi-search text-white d-inline position-absolute ms-3"></i> */}
            <form onSubmit={searchSubmitHandler} className="w-100">
              <input
                type="text"
                className="text-white form-control rounded-pill form-control-lg border-0 d-inline shadow-none bg-black"
                id="search"
                // placeholder="Search Playbook"
                placeholder="Search a game, character and much more..."
                value={criteria}
                onChange={criteriaChangeHandler}
              />
              <button
                type="submit"
                className="p-2 ps-3 pe-3 rounded-circle bi bi-search text-white position-absolute wb-search-icon"
              ></button>
            </form>
          </div>
        </div>

        {/* Buttons to navigate between types of search result */}
        <div className="col-12 row mt-2">
          <div className="container col-6 d-flex justify-content-center">
            <button
              onClick={gamesClickHandler}
              className={`btn btn-dark wb-rounded-border m-1 m-md-4 p-md-2 ps-md-4 pe-md-4 ${
                isGames ? "active" : ""
              }`}
            >
              Games
            </button>
            <button
              onClick={charactersClickHandler}
              className={`btn btn-dark wb-rounded-border m-1 m-md-4 p-md-2 ps-md-4 pe-md-4 ${
                isCharacters ? "active" : ""
              }`}
            >
              Characters
            </button>
            <button
              onClick={companiesClickHandler}
              className={`btn btn-dark wb-rounded-border m-1 m-md-4 p-md-2 ps-md-4 pe-md-4 ${
                isCompanies ? "active" : ""
              }`}
              disabled
            >
              Companies
            </button>
          </div>
        </div>

        {/* Page navigation buttons */}
        {searchResult && searchResult.length > 0 && (
          <div className="container col-12 mt-1 mb-2 d-flex justify-content-center">
            <button
              disabled={pageNumber === 0 ? true : false}
              type="button"
              className="btn btn-secondary text-white"
              onClick={() => {
                if (pageNumber > 0) {
                  return setPageNumber(pageNumber - 1);
                }
              }}
            >
              <i className="bi bi-caret-left"></i>
            </button>
            {/* <input value={pageNumber + 1} size={2} className="ms-2 me-2" /> */}
            <h5 className="ms-2 me-2 mt-2">{pageNumber + 1}</h5>
            <button
              disabled={searchResult.length < pageSize ? true : false}
              type="button"
              className="btn btn-secondary text-white"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <i className="bi bi-caret-right"></i>
            </button>
          </div>
        )}

        {searchLoading && <LoadingSpinner />}

        {/* Iterating through search result */}
        {searchResult && (
          <div className="col-12 row container d-flex justify-content-center">
            {searchResult?.map((s: SearchResult) => (
              <SearchItem key={s.id} s={s} type={type} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
