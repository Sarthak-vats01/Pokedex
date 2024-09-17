import React, { useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { statusChange } from "../api/pokedex.js";
import { useDispatch } from "react-redux";

function Card({ data, user }) {
  const [captured, setCaptured] = useState(data.captured || false);
  const dispatch = useDispatch();

  async function handleStatusChange() {
    const newStatus = !captured;
    setCaptured(newStatus);

    await statusChange({
      id: data.id,
      status: newStatus,
      userId: user,
      dispatch,
    });
  }

  return (
    <div className="bg-white shadow-lg rounded-sm p-4 text-center font-extralight">
      <img src={data.imgUrl} alt="Pikachu" className="h-16 w-16 mx-auto" />
      <h2 className="text-xl text-gray-600 ">{data.name}</h2>
      <p className="text-gray-400">{data.pokemonTypes} </p>

      {/* Captured switch */}
      <div className="flex items-center justify-center mt-4 text-gray-600 ">
        <FormControlLabel
          control={
            <Switch
              checked={captured}
              onChange={handleStatusChange}
              color="primary"
            />
          }
          label={captured ? "Captured" : "Not Captured"}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "0.700rem", // Adjust the font size
              fontWeight: "100", // Adjust font weight for "extralight"
              color: "#4B5563", // Custom text color
            },
          }}
        />
      </div>
    </div>
  );
}

export default Card;
