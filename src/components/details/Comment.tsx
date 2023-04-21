import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Comment, User } from "../../types";
import { deleteComment, updateComment } from "../../services/commentsServices";

interface CommentProps {
  comment: Comment;
  currentUser: User;
  removeComment: (comment: Comment) => void;
  editComment: (comment: Comment) => void;
}

const CommentComponent: React.FC<CommentProps> = ({
  comment,
  currentUser,
  removeComment,
  editComment,
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [commentString, setCommentString] = useState<string>(comment.comment);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if(currentUser.role === "admin") setIsAdmin(true);
    if (comment.dislikesUsernames.find((u) => u === currentUser.username))
      setIsDislike(true);
    if (comment.likesUsernames.find((u) => u === currentUser.username))
      setIsLike(true);
    setIsFlagged(comment.isFlagged);
  }, []);

  const likeClickHandler = () => {
    if (currentUser.username === "") {
      alert("Please login to interact with this comment!");
      return;
    }
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
    if (currentUser.username === "") {
      alert("Please login to interact with this comment!");
      return;
    }
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

  const flagCommentClickHandler = () => {
    if (currentUser.username === "") {
      alert("Please login to interact with this comment!");
      return;
    }
    comment.isFlagged = !isFlagged;
    setIsFlagged(!isFlagged);
    updateComment(comment);
  };

  const editCommentClickHandler = () => {
    if (currentUser.username === comment.username || isAdmin) {
      const newComment = { ...comment, comment: commentString };
      updateComment(newComment).then(() => {
        setIsEdit(!isEdit);
        editComment(newComment);
      });
    }
  };

  const deleteCommentClickHandler = () => {
    if (
      (currentUser.username === comment.username || isAdmin) &&
      window.confirm("Do you really want to delete the comment?")
    ) {
      deleteComment(comment).then(() => removeComment(comment));
    }
  };

  return (
    <div className={`container mt-1 d-flex flex-start wb-bg-gray wb-rounded-border 
    ${currentUser.username === comment.username && "border border-3 border-success"}
    ${isAdmin && "border-warning"}`}>
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
          <span className="fw-bold mb-1">{comment.username}</span>
        </Link>

        {(currentUser.username === comment.username || isAdmin) && (
          <>
            <Link
              to=""
              className="bi bi-pencil ms-2 text-warning"
              onClick={() => setIsEdit(!isEdit)}
            ></Link>
            <Link
              to=""
              className="bi bi-trash ms-2 text-danger"
              onClick={deleteCommentClickHandler}
            ></Link>
            
          </>
        )}
        {currentUser.username !== "" && <Link
              to=""
              className={`bi ${isFlagged?"bi-flag-fill":"bi-flag"} ms-2 text-danger`}
              onClick={flagCommentClickHandler}
              data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Flag this comment"
            ></Link>}

        {comment.createdAt && (
          <small className="fw-light d-block">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        )}

        {/* Edit comment */}
        {isEdit ? (
          <>
            <textarea
              value={commentString}
              placeholder="Edit your comment..."
              className="form-control border-0 bg-black wd-border-ta text-white"
              onChange={(e) => setCommentString(e.target.value)}
            ></textarea>
            <div>
              <button
                className=" btn btn-danger bg-tuiter mt-1 p-0 ps-1 pe-1 fw-bold"
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
              <button
                className=" btn btn-success bg-tuiter ms-2 mt-1 p-0 ps-1 pe-1 fw-bold"
                onClick={editCommentClickHandler}
              >
                Done
              </button>
            </div>
          </>
        ) : (
          // <p className="mt-2 mb-2 fst-italic">{comment.comment}</p>
          <div className="overflow-scroll" style={{maxHeight: "100px"}}>
          <p className="mt-2 mb-2 fst-italic">{comment.comment}</p>
        </div>
        )}

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
