import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Trello = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.trello.com/1/members/me/boards?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`)
      .then(response => response.json())
      .then(data => setBoards(data))
      .catch(error => console.log(error));
  }, []);

  const handleBoardClick = (boardId) => {
    navigate(`/trello/${boardId}`);
  }

  return (
    <div style={{ margin: '10px' }}>
      <h1>Trello</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id} onClick={() => handleBoardClick(board.id)} style={{cursor: 'pointer'}}>{board.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Trello;
