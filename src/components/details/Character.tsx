import React from 'react'
import { useLocation } from 'react-router';

interface CharacterProps {
    
}

const Character: React.FC<CharacterProps> = ({}) => {
    const { pathname } = useLocation();
  const characterId = pathname.split("/")[3];

  return <div>{characterId}</div>;
}

export default Character;