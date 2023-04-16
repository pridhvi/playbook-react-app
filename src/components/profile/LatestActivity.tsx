import React from 'react'
import { Comment, User } from '../../types';
import ProfileCommentComponent from './ProfileComment';

interface LatestActivityProps {
    comments: Comment[];
    user: User;
}

const LatestActivity: React.FC<LatestActivityProps> = ({comments, user}) => {
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
                {comments.map((comment) => (
                  <ProfileCommentComponent
                    key={comment._id}
                    comment={comment}
                    currentUser={user}
                  />
                ))}
              </div>
            </div></>
    );
}

export default LatestActivity;