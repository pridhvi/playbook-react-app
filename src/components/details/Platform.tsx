import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { findGameByIdThunk, findPlatformByIdThunk } from "../../services/igdbThunks";
import { AppDispatch } from "../../redux/Store";
import LoadingSpinner from "../LoadingSpinner";
import { Platform } from "../../types";

interface PlatformComponentProps {}

const PlatformComponent: React.FC<PlatformComponentProps> = ({}) => {
  const { pathname } = useLocation();
  const platformId: number = Number(pathname.split("/")[3]);
  const { platforms, loading } = useSelector((state: any) => state.platformsData);
  const platform: Platform = platforms.filter((p: Platform) => {
    return p.id === platformId;
  })[0];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(findPlatformByIdThunk(Number(platformId)));
  }, []);

  return (
    <div className="container">
      {loading ? <LoadingSpinner /> : null}
      {platform ? (
        <><h1>{platform.platform_logo}</h1>
          <h1>{platform.name}</h1>
          {platform.platform_logo && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                platform.platform_logo.split("/")[7]
              }`}
              height="250px"
              alt="cover"
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default PlatformComponent;
