import React from "react";
import { Comment, Rating, User } from "../../types";
import ProfileCommentComponent from "./ProfileComment";

interface LatestActivityProps {
  comments: Comment[];
  ratings: Rating[];
  user: User;
}

const LatestActivity: React.FC<LatestActivityProps> = ({ comments, user, ratings }) => {
  return (
    <>
      <h5>Latest Activity:</h5>
      <div className="row col-12">
        <div className="col-6 mb-5">
          <p className="float-middle">Comments</p>
          {comments.map((comment) => (
            <ProfileCommentComponent
              key={comment._id}
              comment={comment}
              currentUser={user}
            />
          ))}
        </div>
        <div className="col-6 mb-5">
          <p>Ratings</p>
          {ratings.map((rating) => (
            <div key={rating._id}>
            <span>Item: {rating.itemType}/{rating.itemId}</span>
            <span className="ms-2">Rating: {rating.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestActivity;
