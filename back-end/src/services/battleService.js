module.exports = {
  calculateAttributes(isHP, IV, BS, EV, L) {
    // Método que faz o cálculo da fórmula dos atributos
    return Math.round(((IV + BS + (Math.sqrt(2) * EV) / 8) + (isHP ? 50 : 0)) * L) / 50 + (isHP ? 10 : 5);
  },

  calculatePokemonAttributes(pokemon) {
    pokemon.attack.Value = this.calculateAttributes(false, pokemon.attack.IV, pokemon.attack.BS, pokemon.attack.EV, pokemon.level);
    pokemon.defense.Value = this.calculateAttributes(false, pokemon.defense.IV, pokemon.defense.BS, pokemon.defense.EV, pokemon.level);
    pokemon.speed.Value = this.calculateAttributes(false, pokemon.speed.IV, pokemon.speed.BS, pokemon.speed.EV, pokemon.level);
    pokemon.hp.Value = this.calculateAttributes(true, pokemon.hp.IV, pokemon.hp.BS, pokemon.hp.EV, pokemon.level);

    return pokemon;
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

  calculateBattleOutcome(pokemon01, pokemon02) {
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

    return winner === null ? `A batalha empata e dura ${roundsFor01Loses} turnos` :
      `A batalha acaba em ${(winner === pokemon01) ? roundsFor02Loses : roundsFor01Loses} turnos. Vencedor: ${winner.name}`;
  },
};
