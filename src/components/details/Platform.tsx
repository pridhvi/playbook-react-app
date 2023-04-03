import React from "react";
import { useLocation } from "react-router";

interface PlatformProps {}

const Platform: React.FC<PlatformProps> = ({}) => {
  const { pathname } = useLocation();
  const platformId = pathname.split("/")[3];

  return <div>{platformId}</div>;
};

export default Platform;
