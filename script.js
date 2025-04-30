const form = document.getElementById("pokemon-form");
const input = document.getElementById("pokemonId");
const result = document.getElementById("result");
const sprite = document.getElementById("sprite");
const pokeName = document.getElementById("poke-name");
const pokeId = document.getElementById("poke-id");
const types = document.getElementById("types");
const abilities = document.getElementById("abilities");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const stats = document.getElementById("stats");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim().toLowerCase();
  if (!query) {
    alert("Por favor, digite um nome ou ID de Pokémon!");
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!res.ok) throw new Error("Pokémon não encontrado!");
    const data = await res.json();

    sprite.src = data.sprites.front_default;
    pokeName.textContent = data.name.toUpperCase();
    pokeId.textContent = data.id;
    types.textContent = data.types.map(t => t.type.name).join(", ");
    abilities.textContent = data.abilities.map(a => a.ability.name).join(", ");
    height.textContent = `${data.height / 10} m`;
    weight.textContent = `${data.weight / 10} kg`;

    stats.innerHTML = "<h3>Status Base:</h3>" +
      data.stats.map(s => `<p><strong>${s.stat.name}:</strong> ${s.base_stat}</p>`).join("");

    result.classList.remove("hidden");
  } catch (err) {
    alert(err.message);
    result.classList.add("hidden");
  }
});
