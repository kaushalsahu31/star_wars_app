import axios from 'axios';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  character: any;
  onClick: () => void;
}
const speciesColorMap: { [key: string]: string } = {
  Human: '#ffcc00',
  Droid: '#00ccff',
  Wookiee: '#8b4513',
  Twilek: '#800080',
  default: '#333',
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {



  const backgroundColor = useMemo(() => {
    const speciesName = character.species?.[0]?.name || 'default';
    return speciesColorMap[speciesName] || speciesColorMap.default;
  }, [character.species]);

  return (
    <div className="character-card" style={{ backgroundColor }} onClick={onClick}>
      <img
        src={`https://picsum.photos/200/300?random=${Math.random()}`}
        alt={character.name}
        className="character-card-image"
      />
      <div className="character-card-content">
        <h2 className="character-card-name">{character.name}</h2>
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        {/* <Link to={`/character${character.url.split('people')[1]}`} className="btn">
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default CharacterCard;
