import React from "react";

function Search({ pokemonTypes, captured, setType, setCapture }) {
  return (
    <div className="w-full  flex justify-center items-center py-4 ">
      <form className="w-1/2 flex space-x-4  justify-between items-center ">
        {/* Dropdown for Pokémon Type */}
        <select
          className="p-2 w-2/5 border border-gray-200  bg-white text-black font-extralight text-sm"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          {pokemonTypes.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        {/* Dropdown for Captured Status */}
        <select
          className="p-2 w-2/5 border border-gray-200 bg-white text-black font-extralight text-sm"
          onChange={(e) => setCapture(e.target.value)}
        >
          <option value="">select Condition</option>
          {captured.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Search;
