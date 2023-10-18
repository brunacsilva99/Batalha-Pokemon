module.exports = (sequelize, DataTypes) => {
    const Attributes = sequelize.define('Attributes', {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.ENUM('hp', 'attack', 'defense', 'speed'),
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [['hp', 'attack', 'defense', 'speed']]
        },
      },
      BS:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1, // Valor mínimo permitido
        max: 255 // Valor máximo permitido
      }
      },
      IV:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1, // Valor mínimo permitido
        max: 15 // Valor máximo permitido
      }
      },
      EV:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        min: 1, // Valor mínimo permitido
        max: 262140 // Valor máximo permitido
      }
      },
    }
      // Outros campos do modelo
    );
  
    Attributes.associate = (models) => {
        Attributes.belongsTo(models.Pokemons, {
            foreignKey: 'pokemonId'
        });
    }
  
    return Attributes;
  };
  