const battleService = require("../services/battleService");
const pokemonService = require("../services/pokemonService");
const usersService = require("../services/usersService");

module.exports = {
  async newBattle(req, res) {
    try {
      let combatente01 = req.body.pokemon01;
      let combatente02 = req.body.pokemon02;
      userId = req.body.userId;

      const result = battleService.calculateBattleOutcome(combatente01, combatente02, userId);

      console.log(combatente01, combatente02, result);      
      res.json({ message: result, pokemons: JSON.parse([combatente01, combatente02]) });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        error: e.message ? e.message : "Houve um erro no servidor, a batalha precisa esperar.",
      });
    }
  },

  async newPokemon(req, res) {    
    try {
      // Extrair os dados da requisição
      const { userId, name, level, hp, attack, defense, speed } = req.body;

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
      
      pokemonSaved = await pokemonService.addPokemon(novoPokemon, userId);


      res.json({ message: "Novo Pokémon criado com sucesso!", pokemon: novoPokemon});
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: e.message ? "Erro ao criar Pokémon: "+ e.message : "Erro ao criar Pokémon.",
      });
    }
  },

  async newUser(req,res)
  {
    try
    {
      const { name, age, dateOfBirth, email, cellphone, password, nickname } = req.body;
      await usersService.addUser(name,age,dateOfBirth,email,cellphone,password,nickname)
      res.json({ message: "Novo usuário criado com sucesso!"});
    }
    catch(e)
    {
      console.log(e)
      return res.status(400).json({        
        success: false,
        error: e.message ? "Erro ao criar usuário: "+e.message : "Erro ao criar usuário.",
      });
    }

  }
};
