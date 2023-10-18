const attributesService = require("./attributesService");
const battleService = require("./battleService");
const { Pokemons } = require("../models");

module.exports = {
    async addPokemon(pokemon, userId) {                
        if(!this.validateData(pokemon.level)){
            throw "Level inválido";
        }

        isDataValid = attributesService.validateIntervalOfData(pokemon.hp.BS, pokemon.hp.IV, pokemon.hp.EV)
        && attributesService.validateIntervalOfData(pokemon.attack.BS, pokemon.attack.IV, pokemon.attack.EV)
        && attributesService.validateIntervalOfData(pokemon.defense.BS, pokemon.defense.IV, pokemon.defense.EV)
        && attributesService.validateIntervalOfData(pokemon.speed.BS, pokemon.speed.IV, pokemon.speed.EV);

        console.log("validando dados", isDataValid);

        if(isDataValid)
        {
            hp = battleService.calculateAttributes(true, pokemon.hp.IV, pokemon.hp.BS, pokemon.hp.EV, pokemon.level);
            attack = battleService.calculateAttributes(false, pokemon.attack.IV, pokemon.attack.BS, pokemon.attack.EV, pokemon.level);
            defense = battleService.calculateAttributes(false, pokemon.defense.IV, pokemon.defense.BS, pokemon.defense.EV, pokemon.level);
            speed = battleService.calculateAttributes(false, pokemon.speed.IV, pokemon.speed.BS, pokemon.speed.EV, pokemon.level);

            await Pokemons.create({
                name: pokemon.name,
                level: pokemon.level,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                userId: userId
            });

            pokemon.id = novoPokemon.id;
            pokemon.hp.Value = hp;
            pokemon.attack.Value = attack;
            pokemon.defense.Value = defense;
            pokemon.speed.Value = speed;

            await attributesService.registerAttributes(pokemon, isDataValid);

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
    validateData(level){
        return (level >= 0 && level <= 99);
    }
}