const Attributes = require("../models/Attributes");

module.exports = {
    async registerAttributes(pokemon, isDataValid) {
        
        try{
            if(isDataValid)
            {
                newAttributeHP = await Attributes.create({
                    name: "hp",
                    BS: pokemon.hp.BS,
                    IV: pokemon.hp.IV,
                    EV: pokemon.hp.EV,
                    pokemonId: pokemon.id
                });
                newAttributeAttack = await Attributes.create({
                    name: "attack",
                    BS: pokemon.attack.BS,
                    IV: pokemon.attack.IV,
                    EV: pokemon.attack.EV,
                    pokemonId: pokemon.id
                });
                newAttributeDefense = await Attributes.create({
                    name: "defense",
                    BS: pokemon.defense.BS,
                    IV: pokemon.defense.IV,
                    EV: pokemon.defense.EV,
                    pokemonId: pokemon.id
                });
                newAttributeSpeed = await Attributes.create({
                    name: "speed",
                    BS: pokemon.speed.BS,
                    IV: pokemon.speed.IV,
                    EV: pokemon.speed.EV,
                    pokemonId: pokemon.id
                });
            }

        }
        catch(e){
            throw e;
        }
        
    },
    validateIntervalOfData(BS, IV, EV) {
        return (BS >= 1 && BS <= 255) && (IV >= 1 && IV <= 15) && (EV >= 1 && EV <= 262140)

    }
}