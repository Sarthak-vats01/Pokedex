import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../components/logo.jsx";
import Search from "../components/search.jsx";
import Pokemons from "../components/pokemons.jsx";
import Pagination from "../components/pagination.jsx";
import {
  fetchPokemon,
  loadCapturedPokemonsFromLocalStorage,
} from "../api/pokedex.js";
import { RiLogoutCircleRLine } from "react-icons/ri";
function HomePage() {
  const { userId } = useParams();
  const navigate = useNavigate();

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
    if (!localStorage.getItem("capturedPokemons")) {
      loadCapturedPokemonsFromLocalStorage(dispatch);
    }
  }, [dispatch]);

  const pokemonData = useSelector((state) => state.pokedex.pokemonData);
  const capturedPokemon = useSelector(
    (state) => state.pokedex.capturedPokemons || []
  );

  const updatedPokemonData = pokemonData.map((pokemon) => {
    const isCaptured = capturedPokemon?.data?.some(
      (captured) => captured.pokemonId === pokemon.id
    );
    return { ...pokemon, captured: isCaptured || false }; // Add 'captured' flag, default to false
  });

  // Pagination logic
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const paginatedData = updatedPokemonData.slice(firstIndex, lastIndex);

  const filteredPokemonData = paginatedData.filter((pokemon) => {
    const typeMatches = !type || pokemon.pokemonTypes.includes(type);
    const captureMatches =
      !capture || pokemon.captured === (capture === "captured");
    return typeMatches && captureMatches;
  });

  const totalCards = updatedPokemonData.length;
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

  function handleLogout() {
    // Implement your logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("capturedPokemons"); // Example
    navigate("/"); // Redirect to login page
  }

  const captured = ["captured", "not captured"];

  return (
    <div className="parentdiv bg-blue-300 h-screen flex flex-col justify-between items-center">
      <div className="flex flex-col h-full text-white bg-blue-400 font-bold w-3/4 items-center">
        <div
          id="top"
          className="upper w-full h-1/5 flex justify-center items-center relative"
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
          <Pokemons data={filteredPokemonData} user={userId} />
        </div>

        {/* Pagination Component Positioned Below Cards */}
        <div className="flex justify-center py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
          />
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
          >
            <RiLogoutCircleRLine size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
