import React from "react";
import { Comment, Rating, User } from "../../types";
import ProfileCommentComponent from "./ProfileComment";
import ProfileRatingComponent from "./ProfileRating";

interface LatestActivityProps {
  comments: Comment[];
  ratings: Rating[];
  user: User;
}

const LatestActivity: React.FC<LatestActivityProps> = ({
  comments,
  user,
  ratings,
}) => {
  return (
    <>
      <h5>Latest Activity:</h5>
      <div className="row col-12">
        <div className="col-12 col-sm-6 col-lg-6 mb-5">
          <p>Comments</p>
          <div className="overflow-scroll" style={{ maxHeight: "700px" }}>
            {comments.map((comment) => (
              <ProfileCommentComponent
                key={comment._id}
                comment={comment}
                currentUser={user}
              />
            ))}
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-6 mb-5">
          <p>Ratings</p>

          <div className="overflow-scroll" style={{ maxHeight: "700px" }}>
          {ratings.map((rating) => (
            <ProfileRatingComponent key={rating._id} rating={rating} />
          ))}
          </div>
        </div>

        {/* <div className="col-4 mb-5">
          <p>Flags</p>
          {ratings.map((rating) => (
            <div key={rating._id}>
            <span>Item: {rating.itemType}/{rating.itemId}</span>
            <span className="ms-2">Rating: {rating.rating}</span>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default LatestActivity;
