import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { getAllCommentsByUser } from "../../services/commentsServices";
import { Comment, User } from "../../types";
import CommentComponent from "../details/Comment";
import ProfileCommentComponent from "./ProfileComment";
import { useLocation } from "react-router";
import { findUserByUsername } from "../../services/usersServices";
import LatestActivity from "./LatestActivity";

interface OtherProfileProps {}

const OtherProfile: React.FC<OtherProfileProps> = ({}) => {
  //   const { currentUser, loading } = useSelector(
  //     (state: any) => state.currentUserData
  //   );
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User>();
  const { pathname } = useLocation();
  const username: string = pathname.split("/")[2];

  useEffect(() => {
    if (username) {
      fetchUser(username);
      fetchLatestActivity(username);
    }
  }, []);

  const fetchUser = async (username: string) => {
    setUser(await findUserByUsername(username));
  };

  const fetchLatestActivity = async (username: string) => {
    setComments(await getAllCommentsByUser(username));
  };

  return (
    <>
      {user && (
        <>
          <div className="container">
            <div className="row d-flex justify-content-center bg-black wb-rounded-border bg-opacity-75">
              <img height="200px" width="100%" src="/profile-banner.jpg" alt="banner" />

              <div className="container mb-2">
                <img
                  className="ms-4 rounded-circle position-absolute translate-middle-y border border-4 border-dark"
                  height="130px"
                  width="130px"
                  src="/profile-picture.jpeg"
                  alt="dp"
                />
                <button
                  className="float-end btn btn-success rounded-pill mt-2"
                >
                  Follow
                </button>
              </div>

              <div className="container pt-4 mb-2">
                <h3 className="mb-0 fw-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <small className="wb-text-gray">@{user.username}</small>
                <p className="fst-italic fw-light">{user.about}</p>
              </div>

              <div className="container mb-2 wb-text-gray">
                {user.location && (
                  <>
                    <i className="bi bi-geo-alt-fill"></i>
                    <small className="me-4 ps-2">{user.location}</small>
                  </>
                )}
                {/* {currentUser.dob && (
                <>
                  <i className="bi bi-calendar-heart"></i>
                  <small className="me-4 ps-2">
                    Born {new Date(currentUser.dob).toDateString()}
                  </small>
                </>
              )} */}
                {user.createdAt && <>
                  <i className="bi bi-calendar3"></i>
                <small className="me-4 ps-2">
                  Joined {new Date(user.createdAt).toDateString()}
                </small></>}
              </div>

              <LatestActivity comments={comments} user={user} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OtherProfile;
