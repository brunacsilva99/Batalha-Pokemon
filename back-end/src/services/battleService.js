const Battle = require("../models/Battles");

module.exports = {
  calculateAttributes(isHP, IV, BS, EV, L) {
    // Método que faz o cálculo da fórmula dos atributos
    return Math.round((((IV + BS + (Math.sqrt(2) * EV) / 8) + (isHP ? 50 : 0)) * L) / 50 + (isHP ? 10 : 5));
  },

  calculateDamage(opponentAttack, ownDefense) {
    return (opponentAttack - ownDefense) > 0 ? (opponentAttack - ownDefense) : 0.00001;
  },

  calculateRoundsToWin(damageOf01, damageOf02, HP01, HP02) {
    const roundsFor01Loses = Math.ceil(HP01 / damageOf02);
    console.log(roundsFor01Loses, HP01, damageOf02)
    const roundsFor02Loses = Math.ceil(HP02 / damageOf01);
    console.log(roundsFor02Loses)
    return [roundsFor01Loses, roundsFor02Loses];
  },

  calculateBattleOutcome(pokemon01, pokemon02, userId) {
    let winner = null;
    const damageOf01 = this.calculateDamage(pokemon02.attack.Value, pokemon01.defense.Value);
    const damageOf02 = this.calculateDamage(pokemon01.attack.Value, pokemon02.defense.Value);
    const [roundsFor01Loses, roundsFor02Loses] = this.calculateRoundsToWin(damageOf01, damageOf02, pokemon01.hp.Value, pokemon02.hp.Value);

    if (roundsFor01Loses === roundsFor02Loses) {
      winner = (pokemon01.speed.Value > pokemon02.speed.Value) ? pokemon01 :
        (pokemon01.speed.Value === pokemon02.speed.Value) ? null : pokemon02;
    } else {
      winner = (roundsFor01Loses > roundsFor02Loses) ? pokemon01 : pokemon02;
    }   
    const message = winner === null ? `A batalha empata e dura ${roundsFor01Loses} turnos` :
      `A batalha acaba em ${(winner === pokemon01) ? roundsFor02Loses : roundsFor01Loses} turnos. Vencedor: ${winner.name}`;

      this.saveBattle(pokemon01, pokemon02, winner, userId, ((winner === pokemon01) ? roundsFor02Loses : roundsFor01Loses), message )
  },

  async saveBattle(pokemon01, pokemon02, winner, userId, rounds, message) {
    
    const battle = await Battle.create({
      code: pokemon01.name +"vs"+ pokemon02.name + "_"+ Date.now()+"-"+ userId,
      rounds: rounds,
      winner: winner.id,
      message: message,
      nameParticipant1: pokemon01.name,
      nameParticipant2: pokemon02.name,
      levelParticipant1: pokemon01.level,
      levelParticipant2: pokemon02.level,
      hpParticipant1: pokemon01.hp.Value,
      hpParticipant2: pokemon02.hp.Value,
      defenseParticipant1: pokemon01.defense.Value,
      defenseParticipant2: pokemon02.defense.Value,
      attackParticipant1: pokemon01.attack.Value,
      attackParticipant2: pokemon02.attack.Value,
      speedParticipant1: pokemon01.speed.Value,
      speedParticipant2: pokemon02.speed.Value,
      hasBattles: userId,
      parcipateBattles: [pokemon01.id, pokemon02.id],
    });
    return battle;
  },
};
