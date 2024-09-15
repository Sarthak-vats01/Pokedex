import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../components/logo.jsx";
import Search from "../components/search.jsx";
import Pokemons from "../components/pokemons.jsx";
import Pagination from "../components/pagination.jsx";
import { fetchPokemon } from "../api/pokedex.js";

function HomePage() {
  const [type, setType] = useState("");
  const [capture, setCapture] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8); // Keep the posts per page static

  const dispatch = useDispatch();
  const pokemonTypes = [
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water",
  ];

  useEffect(() => {
    fetchPokemon(dispatch);
  }, [dispatch]);

  const pokemonData = useSelector((state) => state.pokedex.pokemonData);

  // Pagination logic
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const paginatedData = pokemonData.slice(firstIndex, lastIndex);
  const filteredPokemonData = paginatedData.filter((pokemon) => {
    const typeMatches = !type || pokemon.pokemonTypes.includes(type);
    const captureMatches =
      !capture || pokemon.captured === (capture === "captured");

    return typeMatches && captureMatches;
  });

  const totalCards = pokemonData.length;
  const totalPages = Math.ceil(totalCards / postPerPage);

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const captured = ["captured", "not captured"];
  return (
    <div className="parentdiv bg-blue-300 h-screen flex justify-center">
      <div className="h-full overflow-hidden text-white bg-blue-400 font-bold w-3/4 flex flex-col items-center">
        <div
          id="top"
          className="upper w-full h-1/5 flex justify-center items-center"
        >
          <Logo />
        </div>
        <div className="searchbar w-4/5 bg-white flex items-center">
          <Search
            pokemonTypes={pokemonTypes}
            captured={captured}
            setType={setType}
            setCapture={setCapture}
          />
        </div>
        <div className="h-3/5 w-4/5 mt-5 mb-2 overflow-auto">
          <Pokemons data={filteredPokemonData} />
        </div>

        {/* Pagination Component Positioned Below Cards */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </div>
    </div>
  );
}

export default HomePage;
