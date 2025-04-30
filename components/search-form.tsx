"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  onSearch: (query: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nome ou ID do Pokémon"
        className="bg-gray-100 border-2 border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Buscar
      </Button>
    </form>
  )
}
