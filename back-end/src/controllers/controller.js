const battleService = require("../services/battleService")

module.exports = {
    async newBattle(req,res){        

        try
        {       
            const combatente01 = req.body.pokemon01
            const combatente02 = req.body.pokemon02
            
            combatente01 = battleService.getAttributesOfPokemon(combatente01)
            combatente02 = battleService.getAttributesOfPokemon(combatente02)

            var result = battleService.calculationBattle(combatente01,combatente02)

            console.log(combatente01,combatente02,result)
            res.json({message:result, pokemons:[combatente01,combatente02]})

        }
        catch (e) {
            return res.status(400).json({
                sucess: false,
                error: e.response ? e.response.data : "There was an error on the server, the battle need wait"
            })
        }
    },
    async newPokemon(req,res){
        try{
            // Extrair os dados da requisição
            const { nome, nivel, hp, ataque, defesa, velocidade } = req.body;
                    
            // Criar uma nova instância de Pokemon
            const novoPokemon = new Pokemon(
              nome,
              nivel,
              hp.BS,
              hp.IV,
              hp.EV,
              ataque.BS,
              ataque.IV,
              ataque.EV,
              defesa.BS,
              defesa.IV,
              defesa.EV,
              velocidade.BS,
              velocidade.IV,
              velocidade.EV
            );
            
            // Você pode fazer mais ações aqui, como salvar o novo Pokémon em um banco de dados
            
            // Responder com o novo Pokémon criado
            res.json({ message: 'Novo Pokémon criado com sucesso!', pokemon: novoPokemon });
        }
        catch(e){
            return res.status(400).json({
                sucess: false,
                error: e.response ? e.response.data : "Error can't create Pokémon"
            })
        }

    }
}