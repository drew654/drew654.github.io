import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";
import Card from "./Card";
import List from "./List";

const Board = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => setBoard(data))
      .catch((error) => console.log(error));
  }, [boardId]);

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        const listPromises = data.map((list) => {
          return fetch(
            `https://api.trello.com/1/lists/${list.id}/cards?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`
          )
            .then((response) => response.json())
            .then((cards) => {
              return {
                id: list.id,
                name: list.name,
                cards: cards,
              };
            });
        });
        Promise.all(listPromises).then((lists) => setLists(lists));
      })
      .catch((error) => console.log(error));
  }, [boardId]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ margin: "10px" }}>
          <Link to="/trello" style={{ textDecoration: "none", color: "black" }}>
            <h1 style={{ display: "inline-block" }}>Trello</h1>
          </Link>
        </div>
        <div style={{ margin: "10px" }}>
          <h1>{board.name}</h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          margin: "10px",
        }}
      >
        {lists.map((list) => (
          <List key={list.id} list={list} board={board} />
        ))}
      </div>
    </div>
  );
};

export default Board;
