class Pokemon {
    constructor(nome, nivel, hpBS, hpIV, hpEV, ataqueBS, ataqueIV, ataqueEV, defesaBS, defesaIV, defesaEV, velocidadeBS, velocidadeIV, velocidadeEV) {
      this.nome = nome;
      this.nivel = nivel;
      this.hp = {
        BS: hpBS,
        IV: hpIV,
        EV: hpEV,
        Value: null
      };
      this.ataque = {
        BS: ataqueBS,
        IV: ataqueIV,
        EV: ataqueEV,
        Value: null
      };
      this.defesa = {
        BS: defesaBS,
        IV: defesaIV,
        EV: defesaEV,
        Value: null
      };
      this.velocidade = {
        BS: velocidadeBS,
        IV: velocidadeIV,
        EV: velocidadeEV,
        Value: null
      };
    }
  
    // Métodos adicionais podem ser definidos aqui, se necessário.
  }  