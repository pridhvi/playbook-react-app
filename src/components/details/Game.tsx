import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import { Comment, Game, Rating } from "../../types";
import { findGameById } from "../../services/igdbServices";
import {
  createComment,
  getAllCommentsByItem,
} from "../../services/commentsServices";
import CommentComponent from "./Comment";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RatingSvg from "./RatingSvg";
import RatingModal from "./RatingModal";
import { Link } from "react-router-dom";
import { getAllRatingsByItem } from "../../services/ratingsServices";

interface GameProps {}

const GameComponent: React.FC<GameProps> = ({}) => {
  const { pathname } = useLocation();
  const gameId: number = Number(pathname.split("/")[3]);
  const [game, setGame] = useState<Game>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [playbookRating, setPlaybookRating] = useState<number>(0);

  const { currentUser } = useSelector((state: any) => state.currentUserData);
  const [userRatingObj, setUserRatingObj] = useState<Rating>({
    rating: 0,
    itemType: "games",
    itemId: gameId,
    username: currentUser.username,
    isNew: true,
  });

  useEffect(() => {
    fetchGame();
    fetchComments();
    fetchRatings();
  }, []);

  useEffect(() => {
    if (ratings) {
      const u: any = ratings.find((r) => r.username === currentUser.username);
      if (u !== undefined) {
        setUserRatingObj({ ...u, isNew: false });
        setUserRating(u.rating);
      }
      calculatePlaybookRating();
    }
  }, [ratings]);

  const calculatePlaybookRating = () => {
    let playbookTotalRatings = 0;
    ratings.map((r) => (playbookTotalRatings += Number(r.rating)));
    const playbookAverage = playbookTotalRatings / ratings.length;
    setPlaybookRating(playbookAverage);
  };

  const fetchGame = async () => {
    setGame(await findGameById(gameId));
  };

  const fetchComments = async () => {
    setComments(await getAllCommentsByItem("games", gameId));
  };

  const fetchRatings = async () => {
    setRatings(await getAllRatingsByItem("games", gameId));
  };

  const removeComment = (comment: Comment) => {
    setComments(comments.filter((c) => comment._id !== c._id));
  };

  const editComment = (comment: Comment) => {
    setComments(
      comments.filter((c) => {
        if (comment._id === c._id) c.comment = comment.comment;
        return c;
      })
    );
  };

  const updateRatings = (rating: Rating) => {
    let newRatings = ratings.filter(() => {});
    if (rating.isNew) {
      newRatings.push({ ...rating, isNew: false });
      setRatings(newRatings);
    } else {
      newRatings = ratings.filter((r) => {
        if (r._id === rating._id) r.rating = rating.rating;
        return r;
      });
      setRatings(newRatings);
    }
  };

  const removeRating = (rating: Rating) => {
    setRatings(ratings.filter((r) => rating._id !== r._id));
    setUserRating(0);
  };

  const commentSubmitHandler = () => {
    const newComment: Comment = {
      comment,
      itemType: "games",
      itemId: gameId,
      username: currentUser.username,
      likesUsernames: [],
      dislikesUsernames: [],
      isFlagged: false,
    };
    createComment(newComment).then((response) => {
      setComment("");
      fetchComments();
    });
  };

  const responsiveScreenshots = {
    superLargeDesktop: {
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

            <div className="col-12 col-lg-8 wb-game container row m-auto">
              {game.cover ? (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                    game.cover?.url.split("/")[7]
                  }`}
                  height="300px"
                  alt="cover"
                  className="col-5 col-xl-3 border border-dark border-3 p-0 m-auto m-xl-0"
                />
              ) : (
                <img
                  src="/no-image.jpeg"
                  height="300px"
                  alt="cover"
                  className="col-5 col-xl-3 border border-dark border-3 p-0 m-auto m-xl-0"
                />
              )}

              <div className="col-12 col-xl-8 row container">
                <div className="col-12  col-xl-6 container ms-xl-3 d-flex align-items-center">
                  <h1 className="d-none d-xl-inline">{game.name}</h1>
                  <h4 className="d-inline d-xl-none">{game.name}</h4>
                </div>

                <div className="col-12 col-xl-6 row d-flex align-items-center">
                  {/* <p className="col-12">Ratings</p> */}
                  
                  {currentUser.username !== "" ? (
                    <Link
                      to=""
                      className="col-4 m-0 text-decoration-none"
                      data-bs-toggle="modal"
                      data-bs-target="#ratingModal"
                    >
                      <RatingSvg
                        rating={userRating}
                        size="120px"
                        colour="green"
                        type="You"
                      />
                    </Link>
                  ) : (
                    <div className="col-4 m-0">
                      <RatingSvg
                        rating={userRating}
                        size="120px"
                        colour="green"
                        type="Login to rate"
                      />
                    </div>
                  )}
                  <div className="col-4 m-0 ps-4">
                    <RatingSvg
                      rating={playbookRating}
                      size="100px"
                      colour="yellow"
                      type="Playbook"
                    />
                  </div>
                  <div className="col-4 m-0">
                    <RatingSvg
                      rating={game.rating}
                      size="90px"
                      colour="black"
                      type="IGDB"
                    />
                  </div>

                </div>

                {userRatingObj && (
                  <RatingModal
                    rating={userRatingObj}
                    itemType={"games"}
                    itemId={gameId}
                    updateRatings={updateRatings}
                    removeRating={removeRating}
                  />
                )}
              </div>
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

                {game.screenshots && <h3 className="mt-3 mb-2">Screenshots</h3>}

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
                        key={s.url}
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
                        key={a.url}
                      />
                    ))}
                </Carousel>

                {game.videos && <h3 className="mt-3 mb-2">Videos</h3>}

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
                        key={v.video_id}
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
                    removeComment={removeComment}
                    editComment={editComment}
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
