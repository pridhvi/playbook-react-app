import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Game, Rating, User } from "../../types";
import { findGameById } from "../../services/igdbServices";
import RatingSvg from "../details/RatingSvg";

interface ProfileRatingProps {
  rating: Rating;
}

const ProfileRatingComponent: React.FC<ProfileRatingProps> = ({
  rating,
}) => {
  const [game, setGame] = useState<Game>();
  useEffect(() => {
    if (rating.itemType === "games") fetchGame();
  }, []);

  const fetchGame = async () => {
    setGame(await findGameById(rating.itemId));
  };

  return (
    <Link
      target="_blank"
      to={`/details/${rating.itemType}/${rating.itemId}`}
      className="container mt-1 d-flex wb-bg-gray wb-rounded-border text-decoration-none text-white"
    >
      {game && game.cover ? (
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
            game.cover?.url.split("/")[7]
          }`}
          width="60"
          height="60"
          alt="cover"
          className=" shadow-1-strong me-3 mt-2 mb-2"
        />
      ) : (
        <img
          src="/no-image.jpeg"
          width="60"
          height="60"
          alt="cover"
          className="shadow-1-strong me-3 mt-2 mb-2"
        />
      )}

      <div className="ms-2 mb-2">
        {game && <span className="d-block">{game.name}</span>}
        <RatingSvg rating={rating.rating} size="50px" colour="green" type="" />
      </div>
    </Link>
  );
};

export default ProfileRatingComponent;
