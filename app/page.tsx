import { Pokedex } from "@/components/pokedex"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <Pokedex />
    </main>
  )
}
