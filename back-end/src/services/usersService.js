const { Users } = require('../models')

module.exports = {
    async addUser(name,age,dateOfBirth,email,cellphone,password,nickname)
    {
        try
        {
            const newUser = await Users.create({
                name: name,
                age: age,
                dateOfBirth: dateOfBirth,
                email: email,
                cellphone: cellphone,
                password: password,
                nickname: nickname
            });
            return newUser
        }
        catch(err)
        {
            throw err
        }
    }
}