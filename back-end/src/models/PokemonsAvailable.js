module.exports = (sequelize, DataTypes) => {
    const PokemonsAvailable = sequelize.define('PokemonsAvailable', {
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
        code: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      }
    );
  
    PokemonsAvailable.associate = (models) => {
      PokemonsAvailable.hasMany(models.Pokemons, {
        foreignKey: 'parent',
        as: 'pokemons'
      });
    };
  
    return PokemonsAvailable;
  };
  