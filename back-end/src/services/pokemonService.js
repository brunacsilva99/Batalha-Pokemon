const attributesService = require("./attributesService");
const { Pokemons } = require("../models");

module.exports = {
    validateData(level){
        return (level >= 0 && level <= 99);
    },

    calculateAttributes(isHP, IV, BS, EV, L) {
        // Método que faz o cálculo da fórmula dos atributos
        return Math.round((((IV + BS + (Math.sqrt(2) * EV) / 8) + (isHP ? 50 : 0)) * L) / 50 + (isHP ? 10 : 5));
    },

    async addOrUpdatePokemon(pokemon, userId, isUpdate) {
        let pokemonToUpdate = null;
        if(isUpdate){
            pokemonToUpdate = await Pokemons.findByPk(pokemon.id);
            if (!pokemonToUpdate) {
                throw new Error('Registro de pokémon não encontrado'); // Verifique se o registro existe
            }
        }
        
        if(!this.validateData(pokemon.level)){
            throw "Level inválido";
        }

        isDataValid = attributesService.validateIntervalOfData(pokemon.hp.BS, pokemon.hp.IV, pokemon.hp.EV)
        && attributesService.validateIntervalOfData(pokemon.attack.BS, pokemon.attack.IV, pokemon.attack.EV)
        && attributesService.validateIntervalOfData(pokemon.defense.BS, pokemon.defense.IV, pokemon.defense.EV)
        && attributesService.validateIntervalOfData(pokemon.speed.BS, pokemon.speed.IV, pokemon.speed.EV);

        if(isDataValid)
        {
            hp = calculateAttributes(true, pokemon.hp.IV, pokemon.hp.BS, pokemon.hp.EV, pokemon.level);
            attack = calculateAttributes(false, pokemon.attack.IV, pokemon.attack.BS, pokemon.attack.EV, pokemon.level);
            defense = calculateAttributes(false, pokemon.defense.IV, pokemon.defense.BS, pokemon.defense.EV, pokemon.level);
            speed = calculateAttributes(false, pokemon.speed.IV, pokemon.speed.BS, pokemon.speed.EV, pokemon.level);

            const pokemonToSave = null
            if(isUpdate){
                pokemonToUpdate.name = pokemon.name;
                pokemonToUpdate.level = pokemon.level;
                pokemonToUpdate.parent = pokemon.parent;
                pokemonToUpdate.hp = hp;
                pokemonToUpdate.attack = attack;
                pokemonToUpdate.defense = defense;
                pokemonToUpdate.speed = speed;
                pokemonToSave = await pokemonToUpdate.save();

                await attributesService.updateAttributtes(pokemon, isDataValid);
            }
            else{
                pokemonToSave = await Pokemons.create({
                    name: pokemon.name,
                    level: pokemon.level,
                    parent: pokemon.parent,
                    hp: hp,
                    attack: attack,
                    defense: defense,
                    speed: speed,
                    userId: userId
                });

                await attributesService.registerAttributes(pokemon, isDataValid);
            }

            pokemon.id = pokemonToSave.id;
            pokemon.hp.Value = hp;
            pokemon.attack.Value = attack;
            pokemon.defense.Value = defense;
            pokemon.speed.Value = speed; 

            return pokemon;
        }
        else{
            exception = "Intervalo de dados inválido: ";
            if(!attributesService.validateIntervalOfData(pokemon.hp.BS, pokemon.hp.IV, pokemon.hp.EV)){
                exception += " HP";
            }
            if(!attributesService.validateIntervalOfData(pokemon.attack.BS, pokemon.attack.IV, pokemon.attack.EV)){
                exception += " Attack";
            }
            if(!attributesService.validateIntervalOfData(pokemon.defense.BS, pokemon.defense.IV, pokemon.defense.EV)){
                exception += " Defense";
            }
            if(!attributesService.validateIntervalOfData(pokemon.speed.BS, pokemon.speed.IV, pokemon.speed.EV)){
                exception += " Speed";
            }
            throw exception;
        }  
    },
    
    async deletePokemon(id) {    
        const pokemon = await Pokemons.findByPk(id);
    
        if (!pokemon) {
          throw new Error('Registro de pokémon não encontrado'); // Verifique se o registro existe
        }

        const result = await attributesService.deleteAttributtes(id);
        if(result.sucess)
        {
            // Exclua o registro do banco de dados
            await pokemon.destroy();
            
            return 'Registro de pokémon excluído com sucesso';
        }  
        else
        {
            throw result.message;
        } 
        
    }
}