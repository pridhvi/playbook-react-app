import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { currentUser, loading } = useSelector(
    (state: any) => state.currentUserData
  );
  return (
    <div className="row container m-auto">
      <div className="col-12 col-md-10 col-lg-7 container bg-black wb-rounded-border bg-opacity-75">
        {currentUser && (
          <>
            <p>{currentUser.username}</p>
            <p>{currentUser.firstName}</p>
            <p>{currentUser.lastName}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
