import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Comment, User } from "../../types";
import { updateComment } from "../../services/commentsServices";

interface CommentProps {
  comment: Comment;
  currentUser: User;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, currentUser }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);

  useEffect(() => {
    if (comment.dislikesUsernames.find((u) => u === currentUser.username))
      setIsDislike(true);
    if (comment.likesUsernames.find((u) => u === currentUser.username))
      setIsLike(true);
  }, []);

  const likeClickHandler = () => {
    if (currentUser.username === "") return;
    if (isLike) {
      comment.likesUsernames = comment.likesUsernames.filter(
        (u) => u !== currentUser.username
      );
    } else {
      comment.likesUsernames.unshift(currentUser.username);
    }

    setIsLike(!isLike);

    updateComment(comment);
  };

  const dislikeClickHandler = () => {
    if (currentUser.username === "") return;
    if (isDislike) {
      comment.dislikesUsernames = comment.dislikesUsernames.filter(
        (u) => u !== currentUser.username
      );
    } else {
      comment.dislikesUsernames.unshift(currentUser.username);
    }

    setIsDislike(!isDislike);
    updateComment(comment);
  };

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
        <Link
          to=""
          className="text-danger me-1 mt-3"
          onClick={likeClickHandler}
        >
          <i className={`bi ${isLike ? "bi-heart-fill" : "bi-heart"}`}></i>
        </Link>
        <small className="me-4">{comment.likesUsernames.length}</small>
        <Link
          to=""
          className="text-white me-1 mt-3"
          onClick={dislikeClickHandler}
        >
          <i
            className={`bi ${
              isDislike ? "bi-hand-thumbs-down-fill" : "bi-hand-thumbs-down"
            }`}
          ></i>
        </Link>
        <small className="">{comment.dislikesUsernames.length}</small>
      </div>
    </div>
  );
};

export default CommentComponent;
