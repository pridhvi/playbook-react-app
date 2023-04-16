import React, { useEffect, useState } from "react";
import { User } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { updateUserThunk } from "../../services/usersThunks";

interface EditProfileProps {
  currentUser: User;
}

const EditProfile: React.FC<EditProfileProps> = ({ currentUser }) => {
  const [updatedUser, setUpdatedUser] = useState<User>();
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // if(currentUser.dob === "")
    // setUpdatedUser({...currentUser, dob: (new Date()).toISOString().substring(0,10)});
    // else
    setUpdatedUser(currentUser);
  }, []);

  const handleUserUpdate = () => {
    if (updatedUser)
      dispatch(updateUserThunk(updatedUser)).then(() =>
        setMessage("Profile Updated!")
      );
  };

  return (
    <>
      {updatedUser && (
        <>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-black"
                    id="exampleModalLabel"
                  >
                    Edit Profile
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-black">
                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      onChange={(e) => {
                        setUpdatedUser({
                          ...updatedUser,
                          firstName: e.target.value,
                        });
                      }}
                      value={`${updatedUser.firstName}`}
                      id="firstName"
                    ></textarea>
                    <label htmlFor="firstName">Firstname</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      onChange={(e) => {
                        setUpdatedUser({
                          ...updatedUser,
                          lastName: e.target.value,
                        });
                      }}
                      value={`${updatedUser.lastName}`}
                      id="lastName"
                    ></textarea>
                    <label htmlFor="lastName">Lastname</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      onChange={(e) => {
                        setUpdatedUser({
                          ...updatedUser,
                          password: e.target.value,
                        });
                      }}
                      value={`${updatedUser.password}`}
                      id="password"
                    ></textarea>
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      onChange={(e) => {
                        setUpdatedUser({
                          ...updatedUser,
                          about: e.target.value,
                        });
                      }}
                      value={updatedUser.about}
                      id="about"
                      rows={5}
                      style={{ height: "100%" }}
                    ></textarea>
                    <label htmlFor="about">About</label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      onChange={(e) => {
                        setUpdatedUser({
                          ...updatedUser,
                          location: e.target.value,
                        });
                      }}
                      value={updatedUser.location}
                      id="location"
                    ></textarea>
                    <label htmlFor="location">Location</label>
                  </div>

                  {/* {updatedUser.dob && <div className="form-floating mb-4">
                    <input
                      className="form-control"
                      type="date"
                      onChange={(e) => {setUpdatedUser({...updatedUser, dob: e.target.value})}}
                      value={updatedUser.dob}
                      id="dob"
                    ></input>
                    <label htmlFor="dob">Birth date</label>
                  </div>} */}
                </div>
                <div className="modal-footer">
                  <small className="text-success">{message}</small>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUserUpdate}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
