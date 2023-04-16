import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { getAllCommentsByUser } from "../../services/commentsServices";
import { Comment, User } from "../../types";
import CommentComponent from "../details/Comment";
import ProfileCommentComponent from "./ProfileComment";
import { useLocation } from "react-router";
import { findUserByUsername } from "../../services/usersServices";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { currentUser, loading } = useSelector(
    (state: any) => state.currentUserData
  );
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (currentUser.username !== "") fetchLatestActivity(currentUser.username);
  }, []);

  const fetchLatestActivity = async (username: string) => {
    setComments(await getAllCommentsByUser(username));
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center bg-black wb-rounded-border bg-opacity-75">
        {currentUser.username !== "" && (
          <>
            <>
            {/* <button className="btn btn-primary w-25">Follow</button> */}
            <p>{currentUser.username}</p>
            <p>{currentUser.firstName}</p>
            <p>{currentUser.lastName}</p>
            <p>{currentUser.password}</p>
            </>

            <h3>Latest Comments:</h3>
            <div className="col-7 mb-5">
              {comments.map((comment) => (
                <ProfileCommentComponent
                key={comment._id}
                  comment={comment}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </>
        )}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Profile;
