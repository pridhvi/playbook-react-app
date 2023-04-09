import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { currentUser, loading } = useSelector(
    (state: any) => state.currentUserData
  );
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center bg-black wb-rounded-border bg-opacity-75">
        {currentUser && (
          <>
            <p>{currentUser.username}</p>
            <p>{currentUser.firstName}</p>
            <p>{currentUser.lastName}</p>
          </>
        )}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Profile;
