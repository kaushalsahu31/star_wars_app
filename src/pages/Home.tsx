import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCharacters } from '../store/charactersSlice';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import './Home.css'; 
import Modal from '../components/Modal';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error, nextPage } = useSelector((state: RootState) => state.characters);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null); 

  const [isFetching, setIsFetching] = useInfiniteScroll(() => {
    if (!loading && nextPage) {
      dispatch(fetchCharacters(nextPage));
    }
  });
//   const backgroundImages = [
//     'https://images.unsplash.com/photo-1518331483807-f6adb0e1ad23?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1472457847783-3d10540b03d7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1558793576-9bd76e5c4021?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//   ];
//   const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  

  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters('https://swapi.dev/api/people'));
    }
  }, [dispatch, characters.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCharacters = characters.filter((char: any) =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const characterCards = useMemo(() => {
    return filteredCharacters.map((character: any) => (
      <CharacterCard key={character.name} character={character} onClick={() => setSelectedCharacter(character)} />
    ));
  }, [filteredCharacters]);


  return (
    <div className="home">
      <h1>Star Wars Characters</h1>
      
      <SearchBar onSearch={handleSearch} />

      <div className="character-list">
        {characterCards}
      </div>

      {loading && <div className="loading">Loading more characters...</div>}
      {error && <div className="error">Error fetching characters: {error}</div>}
      {selectedCharacter && (
        <Modal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default Home;
