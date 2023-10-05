const battleService = require("../services/battleService");

module.exports = {
  async newBattle(req, res) {
    try {
      let combatente01 = req.body.pokemon01;
      let combatente02 = req.body.pokemon02;

      combatente01 = battleService.calculatePokemonAttributes(combatente01);
      combatente02 = battleService.calculatePokemonAttributes(combatente02);

      const result = battleService.calculateBattleOutcome(combatente01, combatente02);

      console.log(combatente01, combatente02, result);
      res.json({ message: result, pokemons: [combatente01, combatente02] });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        error: e.response ? e.response.data : "Houve um erro no servidor, a batalha precisa esperar.",
      });
    }
  },

  async newPokemon(req, res) {
    try {
      // Extrair os dados da requisição
      const { name, level, hp, attack, defense, speed } = req.body;

      // Criar uma nova instância de Pokemon
      const novoPokemon = {
        name,
        level,
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

      // Você pode fazer mais ações aqui, como salvar o novo Pokémon em um banco de dados

      // Responder com o novo Pokémon criado
      res.json({ message: "Novo Pokémon criado com sucesso!", pokemon: novoPokemon });
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: e.response ? e.response.data : "Erro ao criar Pokémon.",
      });
    }
  },
};
