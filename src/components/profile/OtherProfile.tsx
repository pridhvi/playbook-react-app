import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { getAllCommentsByUser } from "../../services/commentsServices";
import { Comment, User } from "../../types";
import CommentComponent from "../details/Comment";
import ProfileCommentComponent from "./ProfileComment";
import { useLocation } from "react-router";
import { findUserByUsername } from "../../services/usersServices";

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
    <div className="container-fluid">
      <div className="row d-flex justify-content-center bg-black wb-rounded-border bg-opacity-75">
          <>
            <button className="btn btn-primary w-25">Follow</button>
            <p>{user?.username}</p>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
          </>

          <h3>Latest Comments:</h3>
          <div className="col-7 mb-5">
            {user && comments.map((comment) => (
              <ProfileCommentComponent
                key={comment._id}
                comment={comment}
                currentUser={user}
              />
            ))}
          </div>
      </div>
    </div>
  );
};

export default OtherProfile;
