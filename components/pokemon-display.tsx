import Image from "next/image"
import { Loader2 } from "lucide-react"

interface PokemonDisplayProps {
  pokemon: any
  loading: boolean
}

export function PokemonDisplay({ pokemon, loading }: PokemonDisplayProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Loader2 className="h-10 w-10 animate-spin text-red-600" />
        <p className="mt-2 text-gray-600 text-sm">Buscando Pokémon...</p>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-4xl text-gray-400">?</span>
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Digite o nome ou ID
          <br />
          de um Pokémon
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-40 h-40">
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="mt-2 text-center">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <p className="text-gray-600 font-mono">#{pokemon.id.toString().padStart(3, "0")}</p>
        <div className="mt-1 flex justify-center gap-1">
          {pokemon.types.map((type: any) => (
            <span key={type.type.name} className="px-2 py-0.5 rounded text-xs text-white bg-gray-700">
              {type.type.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
