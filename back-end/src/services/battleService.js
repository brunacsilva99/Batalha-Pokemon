const { Battles, Pokemons } = require("../models");

module.exports = { 
  calculateDamage(opponentAttack, ownDefense) {
    return (opponentAttack - ownDefense) > 0 ? (opponentAttack - ownDefense) : 0.00001;
  },

  calculateRoundsToWin(damageOf01, damageOf02, HP01, HP02) {
    const roundsFor01Loses = Math.ceil(HP01 / damageOf02);
    const roundsFor02Loses = Math.ceil(HP02 / damageOf01);
    return [roundsFor01Loses, roundsFor02Loses];
  },

  async calculateBattleOutcome(pokemon01Id, pokemon02Id, userId) {
    let winner = null;
    const pokemon01 = await Pokemons.findOne({ where: { id: pokemon01Id } });
    const pokemon02 = await Pokemons.findOne({ where: { id: pokemon02Id } });

    const damageOf01 = this.calculateDamage(pokemon02.attack, pokemon01.defense);
    const damageOf02 = this.calculateDamage(pokemon01.attack, pokemon02.defense);

    const [roundsFor01Loses, roundsFor02Loses] = this.calculateRoundsToWin(damageOf01, damageOf02, pokemon01.hp, pokemon02.hp);

    if (roundsFor01Loses === roundsFor02Loses) {
      winner = (pokemon01.speed > pokemon02.speed) ? pokemon01 :
        (pokemon01.speed === pokemon02.speed) ? null : pokemon02;
    } else {
      winner = (roundsFor01Loses > roundsFor02Loses) ? pokemon01 : pokemon02;
    }   
    const message = winner === null ? `A batalha empata e dura ${roundsFor01Loses} turnos` :
      `A batalha acaba em ${(winner === pokemon01) ? roundsFor02Loses : roundsFor01Loses} turnos. Vencedor: ${winner.name}`;

    return this.saveBattle(pokemon01, pokemon02, winner, userId, ((winner === pokemon01) ? roundsFor02Loses : roundsFor01Loses), message )
  },

  async saveBattle(pokemon01, pokemon02, winner, userId, rounds, message) {
    
    const battle = await Battles.create({
      code: pokemon01.name +"vs"+ pokemon02.name + "_"+ Date.now().toLocaleString(Intl.DateTimeFormat)+"-"+ userId,
      rounds: rounds,
      winner: winner.id,
      message: message,
      nameParticipant1: pokemon01.name,
      nameParticipant2: pokemon02.name,
      levelParticipant1: pokemon01.level,
      levelParticipant2: pokemon02.level,
      hpParticipant1: pokemon01.hp,
      hpParticipant2: pokemon02.hp,
      defenseParticipant1: pokemon01.defense,
      defenseParticipant2: pokemon02.defense,
      attackParticipant1: pokemon01.attack,
      attackParticipant2: pokemon02.attack,
      speedParticipant1: pokemon01.speed,
      speedParticipant2: pokemon02.speed,
      userId: userId,
    });

    return battle;
  },

  async updateBattle(id,pokemon01, pokemon02, winner, userId, rounds, message)
  {
    const battle = await Battles.findByPk(id);

    if (!battle) {
      throw new Error('Registro de batalha não encontrado'); // Verifique se o registro existe
    }

    battle.code = pokemon01.name +"vs"+ pokemon02.name + "_"+ Date.now().toLocaleString(Intl.DateTimeFormat)+"-"+ userId,
    battle.rounds = rounds
    battle.winner = winner.id
    battle.message = message
    battle.nameParticipant1 = pokemon01.name
    battle.nameParticipant2 = pokemon02.name
    battle.levelParticipant1 = pokemon01.level
    battle.levelParticipant2 = pokemon02.level
    battle.hpParticipant1 = pokemon01.hp
    battle.hpParticipant2 = pokemon02.hp
    battle.defenseParticipant1 = pokemon01.defense
    battle.defenseParticipant2 = pokemon02.defense
    battle.attackParticipant1 = pokemon01.attack
    battle.attackParticipant2 = pokemon02.attack
    battle.speedParticipant1 = pokemon01.speed
    battle.speedParticipant2 = pokemon02.speed
    battle.userId = userId

    await battle.save() 

    return battle
  },

  async deleteBattle(id) {    
    const battle = await Battles.findByPk(id);

    if (!battle) {
      throw new Error('Registro de batalha não encontrado'); // Verifique se o registro existe
    }

    // Exclua o registro do banco de dados
    await battle.destroy();

    return 'Registro de batalha excluído com sucesso';
  }
};
