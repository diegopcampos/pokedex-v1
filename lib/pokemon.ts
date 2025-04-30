export async function searchPokemon(query: string) {
  try {
    // Remove espaços e converte para minúsculas
    const sanitizedQuery = query.trim().toLowerCase()

    // Faz a requisição para a API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${sanitizedQuery}`)

    // Se a resposta não for ok, lança um erro
    if (!response.ok) {
      throw new Error(`Pokémon não encontrado: ${query}`)
    }

    // Retorna os dados do Pokémon
    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error)
    throw error
  }
}
