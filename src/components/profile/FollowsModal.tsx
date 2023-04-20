import React, { useEffect, useState } from "react";
import { Follow, User } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { updateUserThunk } from "../../services/usersThunks";
import { Link } from "react-router-dom";

interface FollowsModalProps {
  followers: Follow[];
  following: Follow[];
}

const FollowsModal: React.FC<FollowsModalProps> = ({
  followers,
  following,
}) => {
  const [updatedUser, setUpdatedUser] = useState<User>();
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <div
        className="modal fade"
        id="followsModal"
        tabIndex={-1}
        aria-labelledby="followsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-black"
                id="followsModalLabel"
              >
                Follows
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-black row">
              <div className="col-6">
                {/* <p>Following</p> */}
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-center bg-secondary text-white">
                    Following
                  </li>

                  {following.map((f) => (
                    <Link
                      key={f._id}
                      className="list-group-item"
                      to={`/profile/${f.masterUser}`}
                      target="_blank"
                    >
                      {f.masterUser}
                    </Link>
                  ))}
                </ul>
              </div>

              <div className="col-6">
                {/* <p>Followers</p> */}
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-center bg-secondary text-white">
                    Followers
                  </li>

                  {followers.map((f) => (
                    <Link
                      key={f._id}
                      className="list-group-item"
                      to={`/profile/${f.followingUser}`}
                      target="_blank"
                    >
                      {f.followingUser}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="modal-footer">
                </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowsModal;
