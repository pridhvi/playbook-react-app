import React, { useState } from 'react'
import { Link } from 'react-router-dom';

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({ }) => {
    const [active, setActive] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const firstNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)
    const lastNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)
    const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
        // Check if username is unique
    }
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)
    const confirmPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => setConfirmPassword(e.target.value)

    return (
        <div className='row container m-auto'>
            <div className='col-12 col-md-10 col-lg-7 container bg-black wb-rounded-border'>
                <div className='container d-flex justify-content-center'>
                    <button
                        onClick={() => setActive("login")}
                        className={`btn btn-dark wb-rounded-border m-4 p-2 ps-4 pe-4 ${(active === 'login') ? 'active' : ''}`}>
                        Log In
                    </button>
                    <button
                        onClick={() => setActive("signup")}
                        className={`btn btn-dark wb-rounded-border m-4 p-2 ps-4 pe-4 ${(active === 'signup') ? 'active' : ''}`}>
                        Sign Up
                    </button>
                </div>

                {active === 'login' &&
                    <div className='container'>
                        <form>
                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="usernameInput">Username</label>
                                <input value={username} onChange={usernameChangeHandler}
                                    type="email" className="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter username" />
                            </div>
                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="usernamePassword">Password</label>
                                <input value={password} onChange={passwordChangeHandler}
                                    type={showPassword ? "text": "password"} className="d-inline form-control" id="passwordInput" placeholder="Password" />
                                <i className="d-inline bi bi-eye-slash text-black" 
                                    onClick={()=> setShowPassword(!showPassword)}></i>
                            </div>
                            <button type="submit" className="btn btn-success mt-3 mb-3">Submit</button>
                        </form>
                    </div>
                }

                {active === 'signup' &&
                    <div className='container'>
                        <form>
                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="firstNameInput">First Name</label>
                                <input value={firstName} onChange={firstNameChangeHandler}
                                    type="email" className="form-control" id="firstNameInput" placeholder="Enter First Name" />
                            </div>

                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="lastNameInput">Last Name</label>
                                <input value={lastName} onChange={lastNameChangeHandler}
                                    type="email" className="form-control" id="lastNameInput" placeholder="Enter Last Name" />
                            </div>

                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="usernameInput">Username</label>
                                <input value={username} onChange={usernameChangeHandler}
                                    type="email" className="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter username" />
                                <small id="usernameHelp" className="form-text text-muted">Choose a unique username</small>
                            </div>

                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="passwordInput">Password</label>
                                <input value={password} onChange={passwordChangeHandler}
                                    type={showPassword ? "text": "password"} className="d-inline form-control" id="passwordInput" placeholder="Enter new password" />
                                <i className="d-inline bi bi-eye-slash text-black" 
                                    onClick={()=> setShowPassword(!showPassword)}></i>
                                <small id="usernameHelp" className="form-text text-muted">Choose a strong password.</small>
                            </div>
                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="confirmPasswordInput">Confirm Password</label>
                                <input value={confirmPassword} onChange={confirmPasswordChangeHandler}
                                    type={showPassword ? "text": "password"} className="d-inline form-control" id="confirmPasswordInput" placeholder="Enter password again" />
                                <i className="d-inline bi bi-eye-slash text-black" 
                                    onClick={()=> setShowPassword(!showPassword)}></i>
                            </div>
                            <button type="submit" className="btn btn-success mt-3 mb-3">Submit</button>
                        </form>
                    </div>
                }

            </div>
        </div>
    );
}

export default Login;