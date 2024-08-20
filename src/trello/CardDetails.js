import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";

const CardDetails = () => {
  const { boardId, cardId } = useParams();
  const [boardName, setBoardName] = useState("");
  const [card, setCard] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/cards/${cardId}?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setDescription(data.desc);
        fetch(
          `https://api.trello.com/1/boards/${boardId}?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`
        )
          .then((response) => response.json())
          .then((data) => {
            setBoardName(data.name);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [cardId]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const updateCardDescription = () => {
    fetch(
      `https://api.trello.com/1/cards/${cardId}?key=${config.TRELLO_API_KEY}&token=${config.TRELLO_API_TOKEN}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc: description,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setDescription(data.desc);
      })
      .catch((error) => console.log(error));
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  const formattedDate = card.due ? new Date(card.due).toLocaleDateString() : "";

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ margin: "10px" }}>
          <Link to="/trello" style={{ textDecoration: "none", color: "black" }}>
            <h1 style={{ display: "inline-block" }}>Trello</h1>
          </Link>
        </div>
        <div style={{ margin: "10px" }}>
          <Link
            to={`/trello/${boardId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h1 style={{ display: "inline-block" }}>{boardName}</h1>
          </Link>
        </div>
      </div>
      <div style={{ margin: "10px" }}>
        <h2>{card.name}</h2>
        <p>Description:</p>
        <textarea value={description} onChange={handleDescriptionChange} />
        <br />
        <button onClick={updateCardDescription}>Save</button>
        <p>Due: {formattedDate}</p>
      </div>
    </div>
  );
};

export default CardDetails;
