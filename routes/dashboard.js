const router = require('express').Router();
const axios = require('axios');
router.get('/', async (req, res) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
    const pokemons = response.data.results;
    const pokemonPromises = pokemons.map(pokemon => axios.get(pokemon.url));
    const pokemonResponses = await Promise.all(pokemonPromises);
    console.log(pokemonResponses)
    const allPokemon = pokemonResponses.map(response => response.data);
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user,
            pokemones: allPokemon
        }
    })
})

router.post('/search', async (req, res) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.value.toLowerCase()}`);
    const pokemon = response.data;
    console.log(pokemon)
    res.json({
        error: null,
        data: {
            pokemon: pokemon
        }
    })
})

module.exports = router