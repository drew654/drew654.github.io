import React from "react";
import Card from "./Card";

const List = ({ list, board }) => {
  return (
    <div key={list.id} style={{ marginRight: "20px" }}>
      <div style={{ width: "200px" }}>
        <h2>{list.name}</h2>
      </div>
      {list.cards.map((card) => (
        <div key={card.id}>
          <Card board={board} card={card} />
        </div>
      ))}
    </div>
  );
};

export default List;
