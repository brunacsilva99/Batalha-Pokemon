module.exports = {
    calculationAttributes(isHP, IV, BS, EV, L) {
      // Método que faz o cálculo da fórmula dos atributos
      return (((IV + BS + (Math.sqrt(2) * EV) / 8) + (isHP ? 50 : 0)) * L) / 50 + (isHP ? 10 : 5);
    },
  
    getAttributesOfPokemon(pokemon) {
      pokemon.ataque.Value = this.calculationAttributes(false, pokemon.ataque.IV, pokemon.ataque.BS, pokemon.ataque.EV, pokemon.nivel);
      pokemon.defesa.Value = this.calculationAttributes(false, pokemon.defesa.IV, pokemon.defesa.BS, pokemon.defesa.EV, pokemon.nivel);
      pokemon.velocidade.Value = this.calculationAttributes(false, pokemon.velocidade.IV, pokemon.velocidade.BS, pokemon.velocidade.EV, pokemon.nivel);
      pokemon.hp.Value = this.calculationAttributes(true, pokemon.hp.IV, pokemon.hp.BS, pokemon.hp.EV, pokemon.nivel);
  
      return pokemon;
    },
  
    calculationDamage(ataqueOponente, defesaPropria) {
      return ataqueOponente - defesaPropria;
    },
  
    defineQtdRounds(damageOf01, damageOf02, HP01, HP02) {
      const roundFor01Loses = Math.ceil(HP01 / damageOf02);
      const roundFor02Loses = Math.ceil(HP02 / damageOf01);
      return [roundFor01Loses, roundFor02Loses];
    },
  
    calculationBattle(pokemon01, pokemon02) {
      let vencedor = null;
      const damageOf01 = this.calculationDamage(pokemon02.ataque.Value, pokemon01.defesa.Value);
      const damageOf02 = this.calculationDamage(pokemon01.ataque.Value, pokemon02.defesa.Value);
      const [roundFor01Loses, roundFor02Loses] = this.defineQtdRounds(damageOf01, damageOf02, pokemon01.hp.Value, pokemon02.hp.Value);
  
      if (roundFor01Loses === roundFor02Loses) {
        vencedor = (pokemon01.velocidade.Value > pokemon02.velocidade.Value) ? pokemon01 :
          (pokemon01.velocidade.Value === pokemon02.velocidade.Value) ? null : pokemon02;
      } else {
        vencedor = (roundFor01Loses > roundFor02Loses) ? pokemon01 : pokemon02;
      }
  
      return vencedor === null ? `A batalha empata e dura ${roundFor01Loses} turnos` :
        `A batalha acaba em ${(vencedor === pokemon01) ? roundFor02Loses : roundFor01Loses} turnos. Vencedor: ${vencedor.nome}`;
    },
  };
  