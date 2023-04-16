import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Character, Comment, Game } from "../../types";
import { findCharacterById } from "../../services/igdbServices";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector } from "react-redux";
import { createComment, getAllCommentsByItem } from "../../services/commentsServices";
import CommentComponent from "./Comment";

interface CharacterProps {}

const CharacterComponent: React.FC<CharacterProps> = ({}) => {
  const { pathname } = useLocation();
  const characterId: number = Number(pathname.split("/")[3]);
  const [character, setCharacter] = useState<Character>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const { currentUser } = useSelector((state: any) => state.currentUserData);

  useEffect(() => {
    fetchCharacter();
    fetchComments();
  }, []);
  const fetchCharacter = async () => {
    setCharacter(await findCharacterById(characterId));
  };const fetchComments = async () => {
    setComments(await getAllCommentsByItem("characters", characterId));
  };

  const commentSubmitHandler = () => {
    const newComment: Comment = {
      comment,
      itemType: "characters",
      itemId: characterId,
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
      {character ? (
        <>
          <h1>{character.name}</h1>
          {character.mug_shot && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                character.mug_shot?.url.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}

          <h3 className="">Games: </h3>
          {character.games.map((g: Game) => (
            <p key={g.id}>{g.name}</p>
          ))}
          {character.description ? (
            <>
              <h3>Description: </h3>
              <p>{character.description}</p>
            </>
          ) : null}
          {character.country_name ? (
            <>
              <h3>Country: </h3>
              <p>{character.country_name}</p>
            </>
          ) : null}

          {/* Comments Section */}

          <div className="mb-5">
            <h3>Comments:</h3>
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
        </>
      ) : <LoadingSpinner />}
    </div>
  );
};

export default CharacterComponent;
