import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommentsByUser } from "../../services/commentsServices";
import { Comment, Follow, Rating, User } from "../../types";
import { useLocation, useNavigate } from "react-router";
import { findUserByUsername } from "../../services/usersServices";
import LatestActivity from "./LatestActivity";
import {
  createFollow,
  deleteFollow,
  getAllFollowsByFollowingUser,
  getAllFollowsByMasterUser,
} from "../../services/followsServices";
import { Link } from "react-router-dom";
import FollowsModal from "./FollowsModal";
import { getAllRatingsByUsername } from "../../services/ratingsServices";
import EditProfile from "./EditProfile";

interface OtherProfileProps {}

const OtherProfile: React.FC<OtherProfileProps> = ({}) => {
  const { currentUser, loading } = useSelector(
    (state: any) => state.currentUserData
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User>();
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { pathname } = useLocation();
  const username: string = pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      if (currentUser.role === "admin") setIsAdmin(true);
      if (username === currentUser.username) navigate("/profile");
      fetchUser(username);
      fetchFollows(username);
      fetchLatestActivity(username);
    }
  }, []);

  const fetchUser = async (username: string) => {
    setUser(await findUserByUsername(username));
  };

  const fetchFollows = async (username: string) => {
    setFollowers(await getAllFollowsByMasterUser(username));
    setFollowing(await getAllFollowsByFollowingUser(username));
  };

  const fetchLatestActivity = async (username: string) => {
    setComments(await getAllCommentsByUser(username));
    setRatings(await getAllRatingsByUsername(username));
  };

  const handleClickFollow = () => {
    if (currentUser.username !== "")
      createFollow(username, currentUser.username).then(() =>
        fetchFollows(username)
      );
    else alert(`Please login to follow ${username}`);
  };

  const handleClickUnFollow = () => {
    if (currentUser.username !== "")
      deleteFollow(username, currentUser.username).then(() =>
        fetchFollows(username)
      );
  };

  return (
    <>
      {user && (
        <>
          <div className="container">
            <div className="row d-flex justify-content-center bg-black wb-rounded-border bg-opacity-75">
              <img
                height="200px"
                width="100%"
                src="/profile-banner.jpg"
                alt="banner"
              />

              <div className="container mb-2">
                <img
                  className="ms-4 rounded-circle position-absolute translate-middle-y border border-4 border-dark"
                  height="130px"
                  width="130px"
                  src="/profile-picture.jpeg"
                  alt="dp"
                />

                {isAdmin && (
                  <button
                    className="float-end btn btn-light rounded-pill mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editProfileModal"
                  >
                    Edit Profile
                  </button>
                )}
                <EditProfile currentUser={user} isAdmin={isAdmin} />

                {followers?.some(
                  (f) =>
                    f.masterUser === username &&
                    f.followingUser === currentUser.username
                ) ? (
                  <button
                    className="float-end btn btn-danger rounded-pill mt-2"
                    onClick={handleClickUnFollow}
                  >
                    Unfollow
                  </button>
                ) : (
                  <div
                    className="float-end btn btn-success rounded-pill mt-2"
                    onClick={handleClickFollow}
                  >
                    Follow
                  </div>
                )}
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
                {user.createdAt && (
                  <>
                    <i className="bi bi-calendar3"></i>
                    <small className="me-4 ps-2">
                      Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  </>
                )}
              </div>
              <Link
                to=""
                className="container mb-2 wb-text-gray"
                data-bs-toggle="modal"
                data-bs-target="#followsModal"
              >
                <small>{following?.length}</small>
                <small className="me-4 ps-2">Following</small>
                <small>{followers?.length}</small>
                <small className="me-4 ps-2">Followers</small>
              </Link>

              <h5>Latest Activity:</h5>
              <LatestActivity
                comments={comments}
                ratings={ratings}
                user={user}
                height="700px"
              />
              <FollowsModal followers={followers} following={following} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OtherProfile;
