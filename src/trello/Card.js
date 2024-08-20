import React from "react";
import { Link } from "react-router-dom";

const Card = ({ board, card }) => {
  const formattedDate = card.due ? new Date(card.due).toLocaleDateString() : "";
  return (
    <div style={{ border: "1px solid black", padding: "4px", width: "200px" }}>
      <Link
        to={`/trello/${board.id}/${card.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3 style={{ margin: "0px" }}>{card.name}</h3>
        <p style={{ margin: "0px" }}>{formattedDate}</p>
      </Link>
    </div>
  );
};

export default Card;
