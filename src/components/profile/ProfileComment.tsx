import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Comment, User } from "../../types";

interface ProfileCommentProps {
  comment: Comment;
  currentUser: User;
}

const ProfileCommentComponent: React.FC<ProfileCommentProps> = ({
  comment,
  currentUser,
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);

  useEffect(() => {
    if (comment.dislikesUsernames.find((u) => u === currentUser.username))
      setIsDislike(true);
    if (comment.likesUsernames.find((u) => u === currentUser.username))
      setIsLike(true);
  }, []);

  return (
    <div className="container mt-1 d-flex flex-start wb-bg-gray wb-rounded-border">
      <img
        className="rounded-circle shadow-1-strong me-3 mt-2"
        // src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
        src="/profile-picture.jpeg"
        alt="avatar"
        width="60"
        height="60"
      />
      <div className="mt-2 mb-2">
      <Link
          className="text-decoration-none text-white"
          to={`/profile/${comment.username}`}
          target="_blank"
        >
          <h6 className="fw-bold mb-1">{comment.username}</h6>
        </Link>
        {comment.createdAt && (
          <small className="fw-light">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        )}
        <p className="mt-2 mb-2 fst-italic">{comment.comment}</p>
        {/* disable buttons if not loggedin */}
        {/* <Link to="" className="text-danger me-1 mt-3"> */}
          <i className={`bi ${isLike ? "bi-heart-fill" : "bi-heart"} text-danger me-1 mt-3`}></i>
        {/* </Link> */}
        <small className="me-4">{comment.likesUsernames.length}</small>
        {/* <Link to="" className="text-white me-1 mt-3"> */}
          <i
            className={`bi ${
              isDislike ? "bi-hand-thumbs-down-fill" : "bi-hand-thumbs-down"
            } text-danger me-1 mt-3`}
          ></i>
        {/* </Link> */}
        <small className="">{comment.dislikesUsernames.length}</small>

        <Link
          to={`/details/${comment.itemType}/${comment.itemId}`}
          className="text-decoration-none d-block text-info"
          target="_blank"
        >
          Go to comment
        </Link>
      </div>
    </div>
  );
};

export default ProfileCommentComponent;
