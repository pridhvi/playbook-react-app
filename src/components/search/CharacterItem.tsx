import React from "react";
import { Link } from "react-router-dom";

interface CharacterItemProps {
  id: string;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ id }) => {
  return (
    <Link
      className="col-3 wb-bg-brown wb-rounded-border border text-decoration-none text-white m-2"
      to={""}
    ></Link>
  );
};

export default CharacterItem;
