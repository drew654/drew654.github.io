import React from "react";
import Card from "./Card";

const List = ({ column, board }) => {
  return (
    <div key={column.id} style={{ marginRight: "20px" }}>
      <div style={{ width: "200px" }}>
        <h2>{column.name}</h2>
      </div>
      {column.cards.map((card) => (
        <div key={card.id}>
          <Card board={board} card={card} />
        </div>
      ))}
    </div>
  );
};

export default List;
