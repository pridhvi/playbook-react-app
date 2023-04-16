import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { getAllCommentsByUser } from "../../services/commentsServices";
import { Comment } from "../../types";
import ProfileCommentComponent from "./ProfileComment";
import { useNavigate } from "react-router";
import EditProfile from "./EditProfile";
import LatestActivity from "./LatestActivity";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { currentUser, loading } = useSelector(
    (state: any) => state.currentUserData
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.username !== "") fetchLatestActivity(currentUser.username);
    else {
      alert("Please login to view profile!");
      navigate("/login");
    }
  }, []);

  const fetchLatestActivity = async (username: string) => {
    setComments(await getAllCommentsByUser(username));
  };

  return (
    <div className="container">
      <div className="row bg-black wb-rounded-border bg-opacity-75">
        {currentUser.username !== "" && (
          <>
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
              <button
                className="float-end btn btn-light rounded-pill mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit Profile
              </button>
            </div>

            <div className="container pt-4 mb-2">
              <h3 className="mb-0 fw-bold">
                {currentUser.firstName} {currentUser.lastName}
              </h3>
              <small className="wb-text-gray">@{currentUser.username}</small>
              <p className="fst-italic fw-light">{currentUser.about}</p>
            </div>

            <div className="container mb-2 wb-text-gray">
              {currentUser.location && (
                <>
                  <i className="bi bi-geo-alt-fill"></i>
                  <small className="me-4 ps-2">{currentUser.location}</small>
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
              <i className="bi bi-calendar3"></i>
              <small className="me-4 ps-2">
                Joined {new Date(currentUser.createdAt).toDateString()}
              </small>
            </div>

            {/* <div className="container mb-2 wb-text-gray">
              <small>{23}</small>
              <small className="me-4 ps-2">Following</small>
              <small>{33}</small>
              <small className="me-4 ps-2">Followers</small>
            </div> */}

            <LatestActivity comments={comments} user={currentUser} />

            {/* Edit profile modal */}
            <EditProfile currentUser={currentUser} />
          </>
        )}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Profile;
