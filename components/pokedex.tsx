"use client"

import { useState } from "react"
import { SearchForm } from "./search-form"
import { PokemonDisplay } from "./pokemon-display"
import { PokemonInfo } from "./pokemon-info"
import { searchPokemon } from "@/lib/pokemon"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pokedex() {
  const [pokemon, setPokemon] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Por favor, digite o nome ou ID de um Pokémon")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await searchPokemon(query.toLowerCase())
      setPokemon(data)
      // Se a Pokédex estiver fechada, abra-a
      if (!isOpen) {
        setIsOpen(true)
      }
    } catch (err) {
      setError("Pokémon não encontrado. Verifique o nome ou ID e tente novamente.")
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  const navigatePokemon = async (direction: "prev" | "next") => {
    if (!pokemon) return

    const newId = direction === "prev" ? Math.max(1, pokemon.id - 1) : pokemon.id + 1

    setLoading(true)
    try {
      const data = await searchPokemon(newId.toString())
      setPokemon(data)
    } catch (err) {
      setError("Não foi possível carregar o próximo Pokémon.")
    } finally {
      setLoading(false)
    }
  }

  const togglePokedex = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full max-w-md">
      {/* Pokédex exterior */}
      <div
        className={`bg-red-600 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform ${isOpen ? "scale-100" : "scale-95"}`}
      >
        {/* Top section with hinge */}
        <div className="h-6 bg-red-700 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-red-800 rounded-b-lg"></div>
        </div>

        {/* Main body */}
        <div className="p-5 relative">
          {/* Top lights */}
          <div className="absolute top-3 left-4 flex space-x-3 items-center">
            <div className="w-14 h-14 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center shadow-inner">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-blue-300 animate-pulse"></div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-400 border border-red-700"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-400 border border-yellow-700"></div>
              <div className="w-4 h-4 rounded-full bg-green-400 border border-green-700"></div>
            </div>
          </div>

          {/* Main screen (top) */}
          <div className="mt-16 bg-gray-800 rounded-lg p-3 border-4 border-gray-900 shadow-inner">
            <div className="bg-gray-200 rounded p-2 min-h-[220px] flex items-center justify-center relative">
              <PokemonDisplay pokemon={pokemon} loading={loading} />

              {/* Screen details */}
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-red-500 border border-red-700"></div>
              <div className="absolute bottom-2 left-2 w-6 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-4 flex justify-between px-2">
            <button
              onClick={() => navigatePokemon("prev")}
              disabled={!pokemon || loading || pokemon.id <= 1}
              className="w-12 h-12 rounded-full bg-blue-600 border-2 border-blue-800 flex items-center justify-center text-white disabled:opacity-50"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={togglePokedex}
              className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-yellow-700 flex items-center justify-center text-gray-800"
            >
              {isOpen ? "×" : "○"}
            </button>

            <button
              onClick={() => navigatePokemon("next")}
              disabled={!pokemon || loading}
              className="w-12 h-12 rounded-full bg-blue-600 border-2 border-blue-800 flex items-center justify-center text-white disabled:opacity-50"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Divider with LED lights */}
          <div className="mt-4 relative h-6 bg-red-700 rounded-full flex items-center px-3">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <div className="ml-auto w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
          </div>

          {/* Bottom section - only visible when open */}
          <div
            className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            {/* Secondary screen (bottom) */}
            <div className="mt-4 bg-gray-800 rounded-lg p-3 border-4 border-gray-900 shadow-inner">
              <div className="bg-blue-900 rounded p-2 min-h-[150px] flex items-center justify-center relative">
                <PokemonInfo pokemon={pokemon} loading={loading} />

                {/* Screen details */}
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-700 border border-blue-500"></div>
                <div className="absolute top-2 left-2 w-4 h-1 bg-blue-700 rounded-full"></div>
              </div>
            </div>

            {/* Search form */}
            <div className="mt-4">
              <SearchForm onSearch={handleSearch} />

              {error && (
                <div className="mt-3 p-2 bg-red-100 border-2 border-red-400 text-red-700 rounded text-sm">{error}</div>
              )}
            </div>

            {/* D-pad and buttons */}
            <div className="mt-4 flex justify-between items-center">
              {/* D-pad */}
              <div className="relative w-28 h-28">
                {/* Center button */}
                <div className="absolute inset-0 m-auto w-8 h-8 bg-gray-700 rounded-full z-10"></div>

                {/* Up button */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white">
                  ▲
                </div>

                {/* Left button */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white">
                  ◄
                </div>

                {/* Right button */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white">
                  ►
                </div>

                {/* Down button */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white">
                  ▼
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-green-700 flex items-center justify-center text-white font-bold shadow-md">
                  A
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500 border-2 border-red-700 flex items-center justify-center text-white font-bold shadow-md">
                  B
                </div>
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="mt-4 flex justify-center space-x-4">
              <div className="w-16 h-6 bg-gray-800 rounded-full"></div>
              <div className="w-16 h-6 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="h-6 bg-red-700"></div>
      </div>
    </div>
  )
}
