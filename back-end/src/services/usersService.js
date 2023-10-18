const { Users } = require('../models')

module.exports = {
    async addUser(name,age,dateOfBirth,email,cellphone,password,nickname)
    {        
        try
        {
            dateOfBirth = new Date(dateOfBirth)

            const isValid = await this.validateCanAddUser(name,age,dateOfBirth,email,cellphone,password,nickname)

            if(isValid === true)
            {
                await Users.create({
                    name: name,
                    age: age,
                    dateOfBirth: dateOfBirth,
                    email: email,
                    cellphone: cellphone,
                    password: password,
                    nickname: nickname
                });
            }
            else{
                throw new Error("Erro ao validar dados do usuário.")
            }
        }
        catch(err)
        {
            throw err
        }
    },

    async validateCanAddUser(name,age,dateOfBirth,email,cellphone,password,nickname)
    {
        try
        {
            if(!name && !age && !dateOfBirth && !email && !cellphone && !password && !nickname)
            {
                throw new Error("Campos não podem ser vazio.")
            }
            
            const userEmail = await Users.findOne({
                where: {
                    email: email
                }
            })  
            
            if(userEmail)
            {
                throw new Error("Email já associado a um usuário. Digite outro email.")
            }

            const userCellphone = await Users.findOne({
                where: {
                    cellphone: cellphone
                }
            })

            if(userCellphone)
            {
                throw new Error("Celular já associado a um usuário. Digite outro celular.")
            }
           
            const user = await Users.findOne({
                where: {
                    nickname: nickname
                }
            })  

            if(user)
            { 
               throw new Error("Nickname já existe. Digite outro nickname.")
            }
            return true
        }
        catch(err)
        {
            throw err
        }

    }
}