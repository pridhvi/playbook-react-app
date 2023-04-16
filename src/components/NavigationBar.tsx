import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutThunk } from "../services/usersThunks";
import { AppDispatch } from "../redux/Store";

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
  const { pathname } = useLocation();
  const active: string = pathname.split("/")[1];
  const { currentUser, error } = useSelector(
    (state: any) => state.currentUserData
  );
  const dispatch = useDispatch<AppDispatch>();

  const logouthandler = () => {
    dispatch(logoutThunk());
  };

  // useEffect(() => {
  //   if (error !== "") alert(error);
  // }, [error]);

  return (
    <>
      <Link className="wb-logo d-none d-xl-inline text-decoration-none" to="/">
        <img src="/playbook-logo.png" height="50px"></img>
      </Link>
      <div className="container d-flex justify-content-center pt-4 mb-3 mb-md-5">
        <Link
          className="ms-auto nav-link p-0 ps-2 pe-2 d-flex justify-content-center align-items-center rounded-pill bg-black shadow"
          to="/"
        >
          <span
            className={`wb-text-gray rounded-pill p-1 pe-2 ps-2 ${
              active === "" ? "active" : ""
            }`}
          >
            <i className="bi bi-house-door-fill"></i>
          </span>
        </Link>

        <div className="nav nav-pills ms-2 me-2 p-2 rounded-pill bg-black shadow">
          <Link
            className="nav-link p-0 d-flex justify-content-center"
            to="/search"
          >
            <span
              className={`wb-text-gray rounded-pill ms-1 me-1 p-1 pe-3 ps-3 ${
                active === "search" ? "active" : ""
              }`}
            >
              <i className="me-2 bi bi-search"></i>
              <span>Search</span>
            </span>
          </Link>

          <Link
            className="nav-link p-0 d-flex justify-content-center"
            to="/profile"
          >
            <span
              className={`wb-text-gray rounded-pill ms-1 me-1 p-1 pe-3 ps-3 ${
                active === "profile" ? "active" : ""
              }`}
            >
              <i className="me-2 bi bi-person"></i>
              <span>Profile</span>
            </span>
          </Link>
        </div>

        {currentUser.username === "" ? (
          <Link
            className="ms-auto nav-link p-0 d-flex justify-content-center align-items-center rounded-pill bg-black shadow border border-info"
            to="/login"
          >
            <span
              className={`h-100 wb-text-gray rounded-pill p-1 pe-2 ps-2 d-flex justify-content-center align-items-center ${
                active === "login" ? "active" : ""
              }`}
            >
              <i className="text-info ms-2 ms-md-0 me-2 bi bi-box-arrow-in-right"></i>
              <span className="d-none d-md-inline">Log In</span>
            </span>
          </Link>
        ) : (
          <Link
            className="ms-auto nav-link p-0 d-flex justify-content-center align-items-center rounded-pill bg-black shadow border border-danger"
            onClick={logouthandler}
            to="#"
          >
            <span
              className={`h-100 wb-text-gray rounded-pill p-1 pe-2 ps-2 d-flex justify-content-center align-items-center ${
                active === "login" ? "active" : ""
              }`}
            >
              <i className="text-danger ms-2 ms-md-0 me-2 bi bi-box-arrow-in-left"></i>
              <span className="d-none d-md-inline">Log Out</span>
            </span>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavigationBar;
