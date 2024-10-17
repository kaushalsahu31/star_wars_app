import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetails.css';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [homeworldName, setHomeworldName] = useState<string>('');
  const [films, setFilms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1472457847783-3d10540b03d7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1558793576-9bd76e5c4021?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  
  // Choose a random image from the list
  const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        // Fetch character details
        const characterResponse = await axios.get(`https://swapi.dev/api/people/${id}`);
        setCharacter(characterResponse.data);

        // Fetch homeworld name
        const homeworldResponse = await axios.get(characterResponse.data.homeworld);
        setHomeworldName(homeworldResponse.data.name);

        // Fetch film titles
        const filmPromises = characterResponse.data.films.map((filmUrl: string) =>
          axios.get(filmUrl).then((res) => res.data.title)
        );
        const filmTitles = await Promise.all(filmPromises);
        setFilms(filmTitles);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading || !character) {
    return <div className="loading">Loading character details...</div>;
  }

  return (
    <div className="character-details" style={{ backgroundImage: `url(${randomImage})` }}>
      <div className="character-overlay">
        <h1>{character.name}</h1>
        <div className="character-card animate-fadein">
          <div className="character-info">
            <h2>Personal Details</h2>
            <ul>
              <li><strong>Height:</strong> {character.height} cm</li>
              <li><strong>Mass:</strong> {character.mass} kg</li>
              <li><strong>Hair Color:</strong> {character.hair_color}</li>
              <li><strong>Skin Color:</strong> {character.skin_color}</li>
              <li><strong>Eye Color:</strong> {character.eye_color}</li>
              <li><strong>Birth Year:</strong> {character.birth_year}</li>
              <li><strong>Gender:</strong> {character.gender}</li>
              <li><strong>Homeworld:</strong> {homeworldName}</li>
            </ul>
          </div>

          <div className="character-associated">
            <h2>Films</h2>
            <ul>
              {films.map((film, index) => (
                <li key={index}>{film}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
