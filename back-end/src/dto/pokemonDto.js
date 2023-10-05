class PokemonDto {
    constructor(name, level, hpBS, hpIV, hpEV, attackBS, attackIV, attackEV, defenseBS, defenseIV, defenseEV, speedBS, speedIV, speedEV) {
      this.name = name;
      this.level = level;
      this.hp = {
        BS: hpBS,
        IV: hpIV,
        EV: hpEV,
        Value: null
      };
      this.attack = {
        BS: attackBS,
        IV: attackIV,
        EV: attackEV,
        Value: null
      };
      this.defense = {
        BS: defenseBS,
        IV: defenseIV,
        EV: defenseEV,
        Value: null
      };
      this.speed = {
        BS: speedBS,
        IV: speedIV,
        EV: speedEV,
        Value: null
      };
    }
  
    // Métodos adicionais podem ser definidos aqui, se necessário.
  }  