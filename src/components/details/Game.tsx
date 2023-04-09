import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import { Comment, Game } from "../../types";
import { findGameById } from "../../services/igdbServices";
import { Link } from "react-router-dom";
import {
  createComment,
  getAllCommentsByItem,
} from "../../services/commentsServices";
import CommentComponent from "./Comment";
import { useSelector } from "react-redux";

interface GameProps {}

const GameComponent: React.FC<GameProps> = ({}) => {
  const { pathname } = useLocation();
  const gameId: number = Number(pathname.split("/")[3]);
  const [game, setGame] = useState<Game>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const { currentUser } = useSelector((state: any) => state.currentUserData);

  useEffect(() => {
    fetchGame();
    fetchComments();
  }, []);

  const fetchGame = async () => {
    setGame(await findGameById(gameId));
  };
  const fetchComments = async () => {
    setComments(await getAllCommentsByItem("games", gameId));
  };

  const commentSubmitHandler = () => {
    const newComment: Comment = {
      comment,
      itemType: "games",
      itemId: gameId,
      username: currentUser.username,
      likesUsernames: [],
      dislikesUsernames: [],
    };
    createComment(newComment).then((response) => {
      setComment("");
      fetchComments();
    });
  };

  return (
    <div className="container">
      {game ? (
        <>
          <h1>{game.name}</h1>
          {game.cover && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                game.cover?.url.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}

          {game.platformsNames ? (
            <>
              <h3 className="">Platforms: </h3>
              <p>{game.platformsNames}</p>
            </>
          ) : null}
          {game.storyline ? (
            <>
              <h3>Storyline: </h3>
              <p>{game.storyline}</p>
            </>
          ) : null}
          {game.summary ? (
            <>
              <h3>Summary: </h3>
              <p>{game.summary}</p>
            </>
          ) : null}

          {/* Comments Section */}

          <div className="mb-5">
            <h3>Comments:</h3>
            {currentUser.username !== "" ? (
              <div className="container mt-4 pt-3 pb-3 d-flex flex-start wb-bg-gray wb-rounded-border">
                <img
                  className="rounded-circle shadow-1-strong me-3 mt-2"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div className="col-10">
                  <textarea
                    value={comment}
                    placeholder="Write a comment..."
                    className="form-control border-0 bg-black wd-border-ta text-white"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div>
                    <button
                      className="rounded-pill btn btn-primary bg-tuiter float-end mt-2 ps-3 pe-3 fw-bold"
                      onClick={commentSubmitHandler}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-info fst-italic">Login to comment here.</p>
            )}
            {comments?.map((comment) => (
              <CommentComponent
                key={comment._id}
                comment={comment}
                currentUser={currentUser}
              />
            ))}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default GameComponent;
