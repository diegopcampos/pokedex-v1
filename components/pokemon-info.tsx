import { Loader2 } from "lucide-react"

interface PokemonInfoProps {
  pokemon: any
  loading: boolean
}

// Função para obter a cor de fundo baseada no tipo do Pokémon
function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  }

  return typeColors[type] || "bg-gray-500"
}

export function PokemonInfo({ pokemon, loading }: PokemonInfoProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-300" />
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <p className="text-blue-300 text-sm text-center">
          Informações detalhadas
          <br />
          aparecerão aqui
        </p>
      </div>
    )
  }

  // Calcular estatísticas básicas
  const totalStats = pokemon.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0)
  const mainStat = pokemon.stats.find((stat: any) => stat.stat.name === "attack" || stat.stat.name === "special-attack")

  return (
    <div className="w-full text-blue-100 p-2 text-sm overflow-y-auto max-h-[150px]">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-mono">
            <span className="font-bold">Altura:</span> {(pokemon.height / 10).toFixed(1)}m
          </p>
          <p className="font-mono">
            <span className="font-bold">Peso:</span> {(pokemon.weight / 10).toFixed(1)}kg
          </p>
          <p className="font-mono">
            <span className="font-bold">Total:</span> {totalStats}
          </p>
        </div>
        <div>
          <p className="font-bold mb-1">Tipos:</p>
          <div className="flex flex-wrap gap-1">
            {pokemon.types.map((type: any) => (
              <span
                key={type.type.name}
                className={`px-2 py-0.5 rounded-full text-xs text-white ${getTypeColor(type.type.name)}`}
              >
                {type.type.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold mb-1">Habilidades:</p>
        <div className="flex flex-wrap gap-1">
          {pokemon.abilities.map((ability: any) => (
            <span key={ability.ability.name} className="px-2 py-0.5 rounded-full text-xs text-white bg-blue-700">
              {ability.ability.name.replace(/-/g, " ")}
              {ability.is_hidden && " (oculta)"}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold mb-1">Estatísticas:</p>
        <div className="grid grid-cols-3 gap-1">
          {pokemon.stats.slice(0, 6).map((stat: any) => (
            <div key={stat.stat.name} className="text-center">
              <div className="text-xs">{stat.stat.name.substring(0, 3).toUpperCase()}</div>
              <div className="font-bold">{stat.base_stat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
