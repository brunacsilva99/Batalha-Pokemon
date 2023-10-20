const battleService = require("../services/battleService");
const pokemonService = require("../services/pokemonService");
const usersService = require("../services/usersService");

module.exports = {
  async newBattle(req, res) {
    try
    {
      let combatente01 = req.body.pokemon01Id;
      let combatente02 = req.body.pokemon02Id;
      userId = req.body.userId;      

      const result = await battleService.calculateBattleOutcome(combatente01, combatente02, userId);
    
      res.json({ message: "Batalha Finalizada com Sucesso", result: result });
    } catch (e)
    {
      return res.status(400).json({
        success: false,
        error: e.message ? e.message : "Houve um erro no servidor, a batalha precisa esperar.",
      });
    }
  },

  async editBattle(req,res)
  {
    try
    {
      const { id } = req.params.id
      const { pokemon01, pokemon02, winner, userId, rounds, message } = req.body
      await battleService.updateBattle(id,pokemon01,pokemon02,winner,userId,rounds,message)
      res.json({ message: "Registro de batalha editado com sucesso!"});
    }
    catch(e)
    {
      return res.status(400).json({        
        success: false,
        error: e.message ? "Erro ao editar registro de batalha: "+e.message : "Erro ao editar registro de batalha.",
      });
    }
  },

  async deleteBattle(req,res)
  {
    try
    {
      const { id } = req.params.id;
      await battleService.deleteBattle(id)
      res.json({ message: "Registro de batalha excluído com sucesso!"});
    }
    catch(e)
    {
      return res.status(400).json({        
        success: false,
        error: e.message ? "Erro ao excluir registro de batalha: "+e.message : "Erro ao excluir registro de batalha.",
      });
    }
  }
};
