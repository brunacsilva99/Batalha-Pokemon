module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        },
        rounds:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 1 // Valor mínimo permitido
          }
        },
        winner:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        message:{
          type: DataTypes.STRING,
          allowNull: false
        },
        nameParticipant1:{
          type: DataTypes.STRING,
          allowNull: false
        },
        nameParticipant2:{
          type: DataTypes.STRING,
          allowNull: false
        },
        levelParticipant1:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 1 // Valor mínimo permitido
          }
        },
        levelParticipant2:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 1 // Valor mínimo permitido
          }
        },
        hpParticipant1:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 1 // Valor mínimo permitido
          }
        },
        hpParticipant2:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 1 // Valor mínimo permitido
          }
        },
        defenseParticipant1:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0 // Valor mínimo permitido
          }
        },
        defenseParticipant2:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0 // Valor mínimo permitido
          }
        },
        attackParticipant1:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0 // Valor mínimo permitido
          }
        },
        attackParticipant2:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0 // Valor mínimo permitido
          }
        },
        speedParticipant1:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0 // Valor mínimo permitido
          }
        },
        speedParticipant2:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 0 // Valor mínimo permitido
          }
        },
    }
    );
  
    Battles.associate = (models) => {
      Battles.belongsTo(models.Users, {
        foreignKey: 'hasBattles',
        as: 'userId',
      });
      Battles.hasMany(models.Pokemons, {
        foreignKey: 'parcipateBattles',
        as: 'pokemons',
      });
    };
  
    return Battles;
  };
  