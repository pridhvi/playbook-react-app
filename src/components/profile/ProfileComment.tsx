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
          <span className="fw-bold mb-1 me-1">{comment.username}</span>
        </Link>

        {comment.createdAt && (
          <small className="fw-light wb-text-gray">
            .{" "}
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        )}

        <i
          className={`bi ${
            comment.isFlagged ? "bi-flag-fill" : "bi-flag"
          } ms-2 text-danger`}
        ></i>

        <div className="overflow-scroll" style={{ maxHeight: "100px" }}>
          <p className="mt-2 mb-2 fst-italic">{comment.comment}</p>
        </div>

        <i
          className={`bi ${
            isLike ? "bi-heart-fill" : "bi-heart"
          } text-danger me-1 mt-3`}
        ></i>

        <small className="me-4">{comment.likesUsernames.length}</small>

        <i
          className={`bi ${
            isDislike ? "bi-hand-thumbs-down-fill" : "bi-hand-thumbs-down"
          } text-danger me-1 mt-3`}
        ></i>

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
