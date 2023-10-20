const {Attributes} = require("../models");

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

    },

    async updateAttributes(pokemon, isDataValid) {
        try{
            if(isDataValid)
            {
                attributeHP = await Attributes.findOne({ where: { pokemonId: pokemon.id, name: "hp" } });
                attributeAttack = await Attributes.findOne({ where: { pokemonId: pokemon.id, name: "attack" } });
                attributeDefense = await Attributes.findOne({ where: { pokemonId: pokemon.id, name: "defense" } });
                attributeSpeed = await Attributes.findOne({ where: { pokemonId: pokemon.id, name: "speed" } });
                
                attributeHP.BS = pokemon.hp.BS;
                attributeHP.IV = pokemon.hp.IV;
                attributeHP.EV = pokemon.hp.EV;
                attributeHP.save();

                attributeAttack.BS = pokemon.attack.BS;
                attributeAttack.IV = pokemon.attack.IV;
                attributeAttack.EV = pokemon.attack.EV;
                attributeAttack.save();

                attributeDefense.BS = pokemon.defense.BS;
                attributeDefense.IV = pokemon.defense.IV;
                attributeDefense.EV = pokemon.defense.EV;
                attributeDefense.save();

                attributeSpeed.BS = pokemon.speed.BS;
                attributeSpeed.IV = pokemon.speed.IV;
                attributeSpeed.EV = pokemon.speed.EV;
                attributeSpeed.save();
            }
        }
        catch(e){
            throw e;
        }
    },

    async deleteAttributes(pokemonId) {    
        const attributes = await Attributes.findAll({ where: { pokemonId: pokemonId } });
    
        if (!attributes && attributes.length === 0) 
        {
          throw new Error('Registro de atributos do pokémon não encontrado'); // Verifique se o registro existe
        }

        foreach(attribute in attributes)
        {
            await attribute.destroy();
        }
    
        return {sucess:true, message:'Registros de atributos pokémons excluído com sucesso'};
    }
}