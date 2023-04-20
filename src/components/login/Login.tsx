import React, { useEffect, useState } from "react";
import * as service from "../../services/usersServices";
import { User } from "../../types";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { loginThunk, signupThunk } from "../../services/usersThunks";
import LoadingSpinner from "../LoadingSpinner";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [active, setActive] = useState<string>("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signupError, setSignupError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isUniqueUsername, setIsUniqueUsername] = useState<boolean>(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const signupSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if(!isUniqueUsername) {
      setSignupError("This username already exists.");
      return;
    }
    if (username === "" || firstName === "" || password === "") {
      setSignupError("Please fill all required fields.");
      return;
    }

    const newUser: User = {
      username,
      password,
      firstName,
      lastName,
      // dob: undefined,
      // createdAt: undefined,
      // isAdmin: false,
      role: "user",
    };

    dispatch(signupThunk(newUser)).then((response) => {
      if (response.type.includes("rejected"))
        setSignupError("This username already exists. Please log in instead.");
      else if (response.type.includes("fulfilled")) {
        setSignupError("");
        navigate("/profile");
      }
      setLoading(false);
    });
  };

  const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (username === "" || password === "") {
      setLoginError("Please fill all required fields.");
      return;
    }

    const loginUser: User = {
      username,
      password,
    };
    dispatch(loginThunk(loginUser)).then((response) => {
      if (response.type.includes("rejected"))
        setLoginError("Invalid credentials. Try again.");
      else if (response.type.includes("fulfilled")) {
        setLoginError("");
        navigate("/profile");
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (password !== "") setIsPasswordMatch(password === confirmPassword);
  }, [confirmPassword, password]);

  useEffect(() => {
    // Check if username is unique
    if (active === "signup")
      service
        .isUser(username)
        .then(() => setIsUniqueUsername(false))
        .catch(() => setIsUniqueUsername(true));
  }, [username]);

  return (
    <div className="row container m-auto">
      <div className="col-12 col-md-10 col-lg-7 container bg-black wb-rounded-border bg-opacity-75">
        <div className="container d-flex justify-content-center">
          <button
            onClick={() => setActive("login")}
            className={`btn btn-dark wb-rounded-border m-4 p-2 ps-4 pe-4 ${
              active === "login" ? "active" : ""
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActive("signup")}
            className={`btn btn-dark wb-rounded-border m-4 p-2 ps-4 pe-4 ${
              active === "signup" ? "active" : ""
            }`}
          >
            Sign Up
          </button>
        </div>

        {active === "login" && (
          <div className="container">
            <small className="text-danger">{loginError}</small>
            <form onSubmit={loginSubmitHandler}>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="usernameInput">
                  Username<span className="text-danger">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  className="form-control"
                  id="usernameInput"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="usernamePassword">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="d-inline form-control"
                  id="passwordInput"
                  placeholder="Password"
                />
                <i
                  className={`d-inline bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } text-black`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              <button type="submit" className="btn btn-success mt-3 mb-3">
                Submit
              </button>
            </form>
          </div>
        )}

        {active === "signup" && (
          <div className="container">
            <small className="text-danger">{signupError}</small>
            <form onSubmit={signupSubmitHandler}>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="firstNameInput">
                  First Name<span className="text-danger">*</span>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="firstName"
                  className="form-control"
                  id="firstNameInput"
                  placeholder="Enter First Name"
                />
              </div>

              <div className="form-group mt-3 mb-3">
                <label htmlFor="lastNameInput">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="lastName"
                  className="form-control"
                  id="lastNameInput"
                  placeholder="Enter Last Name"
                />
              </div>

              <div className="form-group mt-3 mb-3">
                <label htmlFor="usernameInput">
                  Username<span className="text-danger">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  className="form-control"
                  id="usernameInput"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                />
                <small id="usernameHelp" className="form-text text-danger">
                  {!isUniqueUsername &&
                    "Username already exists! Please select a different one."}
                </small>
              </div>

              <div className="form-group mt-3 mb-3">
                <label htmlFor="passwordInput">
                  Password<span className="text-danger">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="d-inline form-control"
                  id="passwordInput"
                  placeholder="Enter new password"
                />
                <i
                  className={`d-inline bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } text-black`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
                <small id="passwordHelp" className="form-text text-muted">
                  Choose a strong password.
                </small>
              </div>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="confirmPasswordInput">
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="d-inline form-control"
                  id="confirmPasswordInput"
                  placeholder="Enter password again"
                />
                <i
                  className={`d-inline bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  } text-black`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
                {isPasswordMatch ? (
                  <small
                    id="confirmPasswordHelp"
                    className="form-text text-success"
                  >
                    Passwords match
                  </small>
                ) : (
                  <small
                    id="confirmPasswordHelp"
                    className="form-text text-danger"
                  >
                    Passwords do not match
                  </small>
                )}
              </div>
              <button type="submit" className="btn btn-success mt-3 mb-3">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Login;
