import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getTrendingGames,
  getTrendingUsers,
} from "../../services/trendingServices";
import { Comment, User } from "../../types";
import { getFlaggedComments } from "../../services/commentsServices";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommentComponent from "../details/Comment";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { currentUser } = useSelector((state: any) => state.currentUserData);
  const [trendingGames, setTrendingGames] = useState<any>();
  const [trendingUsers, setTrendingUsers] = useState<User[]>();
  const [flaggedComments, setFlaggedComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowGames, setIsShowGames] = useState<boolean>(false);

  useEffect(() => {
    fetchLatestData();
  }, []);

  const fetchLatestData = async () => {
    setLoading(true);
    setTrendingGames(await getTrendingGames());
    setTrendingUsers(await getTrendingUsers());
    // if(currentUser.role === "moderator")
    setFlaggedComments(await getFlaggedComments());
    setLoading(false);
  };

  const removeComment = (comment: Comment) => {
    setFlaggedComments(flaggedComments.filter((c) => comment._id !== c._id));
  };

  const editComment = (comment: Comment) => {
    setFlaggedComments(
      flaggedComments.filter((c) => {
        if (comment._id === c._id) c.comment = comment.comment;
        return c;
      })
    );
  };

  const responsiveScreenshots = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
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

  return (
    <div className="row container-fluid m-auto mt-lg-5 mb-5">
      <div className="col-12 col-md-12 container row m-auto d-flex justify-content-center">
        {/* {currentUser.username !== "" && (
          <div className="col-12">
            <h2>
              Welcome, {currentUser.firstName} {currentUser.lastName}
            </h2>
          </div>
        )} */}

        <div
          className={`jumbotron col-12 border border-3 bg-black wb-rounded-border bg-opacity-75 mb-4
        ${currentUser.role === "moderator" && "border-warning"} ${
            currentUser.role === "admin" && "border-danger"
          }`}
        >
          <h1 className="display-6 text-info d-flex justify-content-center">
            {currentUser.username !== ""
              ? `Hi, ${currentUser.firstName} ${currentUser.lastName}`
              : "Welcome"}
          </h1>
          <p
            className="lead fst-italic overflow-scroll text-center"
            style={{ maxHeight: "120px" }}
          >
            Playbook connects gamers from around the world, allowing them to
            discover new games, share their favorite games, and connect with
            like-minded gamers. Access detailed game information, including
            reviews and ratings. Create a profile, follow other gamers, and rate
            and comment on games you've played.
          </p>
          <hr className="my-4" />
          <p className="wb-text-gray text-center d-flex justify-content-center">
            Join the Playbook community today and start connecting with other
            gamers from around the world.
          </p>
          <p className="lead d-flex justify-content-center">
            <Link
              className="btn"
              to="/login"
              role="button"
              style={{ backgroundColor: "#7FFFD4" }}
            >
              Signup
            </Link>
          </p>
        </div>

        {loading && <LoadingSpinner />}

        {currentUser.role === "moderator" && (
          <div className="col-12">
            <h2 className="d-flex justify-content-center text-black">
              Flagged Comments
            </h2>
            <div className="col-12 mb-5">
              {flaggedComments && (
                <div
                  className="overflow-scroll row"
                  style={{ maxHeight: "550px" }}
                >
                  {flaggedComments.map((comment) => (
                    <div className="col-12 col-sm-6 col-lg-4 col-xxl-3">
                      <CommentComponent
                        key={comment._id}
                        comment={comment}
                        currentUser={currentUser}
                        removeComment={removeComment}
                        editComment={editComment}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Trending Section */}
        <h1 className="d-flex justify-content-center text-black">Trending</h1>
        {trendingGames && (
          <>
            <h3>Games</h3>
            <Link to="" onClick={() => setIsShowGames(!isShowGames)}>
              {isShowGames ? "Minimise games" : "Show all games"}
            </Link>
            <div className="col-12 col-lg-9 row d-flex">
              {isShowGames ? (
                <>
                  {trendingGames.map((g: any) => (
                    <div className="card mb-3 wb-search-item">
                      <div className="row no-gutters">
                        <div className="col-5 col-lg-4 col-xl-2">
                          <img
                            src={
                              g[0].cover.url
                                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
                                    g[0].cover.url?.split("/")[7]
                                  }`
                                : "/no-image.jpeg"
                            }
                            height="300px"
                            className="card-img"
                            alt="cover"
                            style={{ maxWidth: "200px" }}
                          />
                        </div>
                        <div className="col-6 col-lg-8 col-xl-10">
                          <div className="card-body">
                            <h5 className="card-title fw-bold">{g[0].name}</h5>
                            <p
                              className="card-text fw-light fst-italic overflow-scroll"
                              style={{ maxHeight: "150px" }}
                            >
                              {g[0].storyline}
                            </p>

                            <Link
                              target="_blank"
                              to={`/details/games/${g[0].id}`}
                              className="btn btn-secondary text-white"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <Carousel
                  responsive={responsiveScreenshots}
                  swipeable={true}
                  infinite={false}
                >
                  {trendingGames.map((g: any) => (
                    <Link target="_blank" to={`/details/games/${g[0].id}`}>
                      <img
                        src={
                          g[0].cover.url
                            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
                                g[0].cover.url?.split("/")[7]
                              }`
                            : "/no-image.jpeg"
                        }
                        height="300px"
                        className=""
                        alt="cover"
                        style={{ maxWidth: "200px" }}
                      />
                    </Link>
                  ))}
                </Carousel>
              )}
            </div>
          </>
        )}

        <div className="container mt-5 col-5 col-lg-4 col-xl-3 overflow-scroll bg-black wb-rounded-border bg-opacity-75"
        style={{maxHeight: "360px"}}>
          {trendingUsers && (
            <>
              <div className="container row rounded-top me-0 ms-0 ps-0 pe-0 pt-2 pb-2">
                <span className=" fw-bold text-white">Who to follow</span>
              </div>

              {trendingUsers.map((u: User) => {
                return (
                  <div
                    key={u._id}
                    className="container row bg-gray me-0 ms-0 ps-0 pe-0 pt-2 pb-2"
                  >
                    <div className="col-2">
                      <img
                        src="/profile-picture.jpeg"
                        // width="45px"
                        width="100%"
                        alt="profile-dp"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-7 text-decoration-none">
                      <span className="d-block fw-bold text-white text-truncate">
                        {u.firstName} {u.lastName}
                        <i
                          className={`bi bi-check-circle-fill
                        ${u.role === "admin" && "text-danger"} ${
                            u.role === "moderator" && "text-warning"
                          }`}
                        ></i>
                      </span>
                      <span className="d-block text-white">@{u.username}</span>
                    </div>
                    <div className="col-3 text-white d-flex align-items-center justify-content-center">
                      <Link
                        to={`/profile/${u.username}`}
                        className="pt-1 pb-1 ps-3 pe-3 btn btn-primary rounded-pill"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
