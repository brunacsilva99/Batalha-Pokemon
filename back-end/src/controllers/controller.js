const battleService = require("../services/battleService");

module.exports = {
  async newBattle(req, res) {
    try {
      let combatente01 = req.body.pokemon01;
      let combatente02 = req.body.pokemon02;

      combatente01 = battleService.getAttributesOfPokemon(combatente01);
      combatente02 = battleService.getAttributesOfPokemon(combatente02);

      const result = battleService.calculationBattle(combatente01, combatente02);

      console.log(combatente01, combatente02, result);
      res.json({ message: result, pokemons: [combatente01, combatente02] });
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: e.response ? e.response.data : "Houve um erro no servidor, a batalha precisa esperar.",
      });
    }
  },

  async newPokemon(req, res) {
    try {
      // Extrair os dados da requisição
      const { nome, nivel, hp, ataque, defesa, velocidade } = req.body;

      // Criar uma nova instância de Pokemon
      const novoPokemon = {
        nome,
        nivel,
        hp: {
          BS: hp.BS,
          IV: hp.IV,
          EV: hp.EV,
          Value: null,
        },
        ataque: {
          BS: ataque.BS,
          IV: ataque.IV,
          EV: ataque.EV,
          Value: null,
        },
        defesa: {
          BS: defesa.BS,
          IV: defesa.IV,
          EV: defesa.EV,
          Value: null,
        },
        velocidade: {
          BS: velocidade.BS,
          IV: velocidade.IV,
          EV: velocidade.EV,
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
