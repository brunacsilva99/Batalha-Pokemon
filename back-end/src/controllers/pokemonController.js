const battleService = require("../services/battleService");
const pokemonService = require("../services/pokemonService");
const usersService = require("../services/usersService");

module.exports = {
  async newPokemon(req, res) {    
    try {
      // Extrair os dados da requisição
      const { userId, name, level, parent, hp, attack, defense, speed } = req.body;

      // Criar uma nova instância de Pokemon
      const novoPokemon = {
        name,
        level,
        parent,
        hp: {
          BS: hp.BS,
          IV: hp.IV,
          EV: hp.EV,
          Value: null,
        },
        attack: {
          BS: attack.BS,
          IV: attack.IV,
          EV: attack.EV,
          Value: null,
        },
        defense: {
          BS: defense.BS,
          IV: defense.IV,
          EV: defense.EV,
          Value: null,
        },
        speed: {
          BS: speed.BS,
          IV: speed.IV,
          EV: speed.EV,
          Value: null,
        },
      };
      
      pokemonSaved = await pokemonService.addOrUpdatePokemon(novoPokemon, userId);


      res.json({ message: "Novo Pokémon criado com sucesso!", pokemon: novoPokemon});
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: e.message ? "Erro ao criar Pokémon: "+ e.message : "Erro ao criar Pokémon.",
      });
    }
  }
};
