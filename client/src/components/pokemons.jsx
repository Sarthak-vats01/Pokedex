import React from "react";
import Card from "./card.jsx";
function Pokemons({ data }) {
  return (
    <div className="h-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-h-full overflow-hidden">
      {data.map((value) => (
        <Card key={value.id} data={value} />
      ))}
    </div>
  );
}

export default Pokemons;
