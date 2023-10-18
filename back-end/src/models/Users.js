module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
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
        age:{
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
          min: 10 // Valor mínimo permitido
          }
        },
        dateOfBirth:{
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
        email:{
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        cellphone:{
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            len: [11, 11]
          },
        },
        password:{
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 100]
          },
        },
        nickname:{            
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [6, 10]
          }          
        },
    }
    );
  
    Users.associate = (models) => {
      Users.hasMany(models.Pokemons, {
        foreignKey: 'userId',
        as: 'pokemons',
      });
      Users.hasMany(models.Battles, {
        foreignKey: 'hasBattles',
        as: 'battles',
      });
    };
  
    return Users;
  };
  