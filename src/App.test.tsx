import { render, fireEvent } from '@testing-library/react';
import CharacterCard from './components/CharacterCard';


test('opens modal on card click', () => {
  const character = { name: 'Luke Skywalker', height: 172, mass: 77, birth_year: '19BBY', films: [] };
  // const { getByText } = render(<CharacterCard character={character} />);
  
  // fireEvent.click(getByText('Luke Skywalker'));
});
