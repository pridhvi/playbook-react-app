import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCriteriaThunk } from "../../services/searchThunks";
import { SearchResult } from "../../types";
import { AppDispatch } from "../../redux/Store";
import SearchItem from "./SearchItem";
import LoadingSpinner from "../Loading";

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  // let isSearch = false;
  const dispatch = useDispatch<AppDispatch>();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [criteria, setCriteria] = useState<string>("");
  const { searchResult, loading } = useSelector(
    (state: any) => state.searchData
  );
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    dispatch(searchCriteriaThunk({ keyword: criteria, pageSize, pageNumber }));
  }, [pageNumber]);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setCriteria(e.target.value);

  // const pageNumberChangeHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   if(typeof(e.target.value))
  //   setPageNumber(Number(e.target.value) || pageNumber)
  // };
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if (criteria === "") {
      setIsSearch(false);
      e.preventDefault();
      return;
    }
    setIsSearch(true);
    dispatch(searchCriteriaThunk({ keyword: criteria, pageSize, pageNumber }));
    setPageNumber(0);
    e.preventDefault();
  };

  return (
    <div className="row container m-auto">
      <div className="col-12">
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
              onChange={searchChangeHandler}
            />
            <button
              type="submit"
              className="p-2 ps-3 pe-3 rounded-circle bi bi-search text-white position-absolute wb-search-icon"
            ></button>
          </form>
        </div>
      </div>

      {loading ? <LoadingSpinner />: null}

      {isSearch && searchResult.length > 0 && (
        <div className="container col-12 mt-3 d-flex justify-content-center">
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
            Prev
          </button>
          {/* <input value={pageNumber + 1} size={2} className="ms-2 me-2" /> */}
          <h5 className="ms-2 me-2 mt-2">{pageNumber + 1}</h5>
          <button
            disabled={searchResult.length < pageSize ? true : false}
            type="button"
            className="btn btn-secondary text-white"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      )}

      {isSearch && (
        <div className="row container d-flex justify-content-center">
          {searchResult.map((s: SearchResult) => (
            <SearchItem key={s.checksum} s={s} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
