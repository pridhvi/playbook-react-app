import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import { Comment, Game } from "../../types";
import { findGameById } from "../../services/igdbServices";
import {
  createComment,
  getAllCommentsByItem,
} from "../../services/commentsServices";
import CommentComponent from "./Comment";
import { useSelector } from "react-redux";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  const responsiveScreenshots = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsiveVideos = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="bg-black bg-opacity-75">
        {game ? (
          <>
            {game.artworks && (
              <img
                height="450px"
                width="100%"
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                  game.artworks[0]?.url.split("/")[7]
                }`}
                alt="artwork"
                className="wb-game-artwork"
              />
            )}

            {!game.artworks && game.screenshots && (
              <img
                height="450px"
                width="100%"
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                  game.screenshots[0]?.url.split("/")[7]
                }`}
                alt="screenshot"
                className="wb-game-artwork"
              />
            )}
            {!game.artworks && !game.screenshots && (
              <img
                height="450px"
                width="100%"
                src="/game-banner.jpg"
                alt="artwork"
                className="wb-game-artwork"
              />
            )}

            <div className="col-8 wb-game container">
              {game.cover && (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                    game.cover?.url.split("/")[7]
                  }`}
                  height="300px"
                  alt="cover"
                />
              )}

              <h1 className="d-block d-xl-inline ms-2">{game.name}</h1>
              <div>
                {game.first_release_date && (
                  <div className="mb-3">
                    <span className="fw-bold">Release Date: </span>
                    <span className="fw-light fst-italic">
                      {new Date(game.first_release_date * 1000).toDateString()}
                    </span>
                  </div>
                )}

                {game.platformsNames ? (
                  <>
                    <span className="fw-bold">Platforms: </span>
                    <small className="fw-light fst-italic">
                      {game.platformsNames}
                    </small>
                  </>
                ) : null}
                {game.summary ? (
                  <div className="mt-3">
                    <p>{game.summary}</p>
                  </div>
                ) : null}

                <h3 className="mt-3 mb-2">Screenshots</h3>

                <Carousel
                  responsive={responsiveScreenshots}
                  swipeable={true}
                  infinite={false}
                >
                  {game.screenshots &&
                    game.screenshots.map((s) => (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                          s.url.split("/")[7]
                        }`}
                        width="95%"
                        height="200px"
                        alt="cover"
                        className="m-2"
                      />
                    ))}
                  {game.artworks &&
                    game.artworks.map((a) => (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                          a.url.split("/")[7]
                        }`}
                        height="200px"
                        width="95%"
                        alt="cover"
                        className="m-2"
                      />
                    ))}
                </Carousel>

                <h3 className="mt-3 mb-2">Videos</h3>

                {game.videos && (
                  <Carousel
                    responsive={responsiveVideos}
                    swipeable={true}
                    infinite={false}
                  >
                    {game.videos.map((v) => (
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${v.video_id}`}
                        title="YouTube video player"
                        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture;"
                      ></iframe>
                    ))}
                  </Carousel>
                )}

                {game.storyline ? (
                  <>
                    <h3 className="mt-3">Storyline</h3>
                    <p>{game.storyline}</p>
                  </>
                ) : null}
              </div>

              {/* Rating */}
              <div className="container m-3 border row wb-bg-gray wb-rounded-border">
                <div className="col-3">
                  <p>Average User Rating</p>
                  <span>{Number(game.rating).toFixed()}</span>
                  <small> / 100</small>
                </div>
                <div className="col-9 d-flex justify-content-center">
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                  <i className="bi bi-star m-2"></i>
                </div>
              </div>

              {/* Comments Section */}

              <div className="pb-5">
                <h3>Comments</h3>
                {currentUser.username !== "" ? (
                  <div className="container mt-4 pt-3 pb-3 d-flex flex-start wb-bg-gray wb-rounded-border">
                    <img
                      className="rounded-circle shadow-1-strong me-3 mt-2"
                      // src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                      src="/profile-picture.jpeg"
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
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default GameComponent;
