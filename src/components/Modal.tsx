import React, { useEffect, useState } from 'react';
import './Modal.css';
import axios from 'axios';

interface ModalProps {
  character: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ character, onClose }) => {
  const[homeland,setHomeland]=useState();
  const homeworldResponse =async ()=>{
    const homeworldResponse = await axios.get(character.homeworld);
    setHomeland(homeworldResponse.data.name)
  };
  useEffect(()=>{
    homeworldResponse()
  },[])
  
  if (!character) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
              <li><strong>Homeworld:</strong> {homeland}</li>
            </ul>
          </div>
        </div>
      </div>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
