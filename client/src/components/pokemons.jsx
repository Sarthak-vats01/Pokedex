import React from "react";
import Card from "./card.jsx";

function Pokemons({ data, user }) {
  return (
    <div className="h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto">
      {data.map((value) => (
        <Card key={value.id} data={value} user={user} />
      ))}
    </div>
  );
}

export default Pokemons;
