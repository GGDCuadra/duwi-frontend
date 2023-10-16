import React from "react";
import { FaSistrix } from "react-icons/fa";

function SearchBar() {
  return (
    <form className="relative w-full">
      <input
        className="bg-search outline-none focus:outline-none rounded-full px-4 py-2 shadow w-full font-poppins" 
        placeholder="Buscar película o serie"
      />
      <button className="absolute right-5 top-1/2 -translate-y-1/2">
        <FaSistrix className="text-2xl"></FaSistrix>
      </button>
    </form>
  );
}

export default SearchBar;