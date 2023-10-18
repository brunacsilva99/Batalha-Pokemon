module.exports = (sequelize, DataTypes) => {
    const Pokemons = sequelize.define('Pokemons', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        level:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0, // Valor mínimo permitido
          max: 99 // Valor máximo permitido
        }
        },
        hp: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        defense: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      }
    );
  
    Pokemons.associate = (models) => {
      Pokemons.hasMany(models.Attributes, {
        foreignKey: 'pokemonId',
        as: 'attributes',
      });
      Pokemons.belongsTo(models.Users, {
        foreignKey: 'userId'
      });
    };
  
    return Pokemons;
  };
  