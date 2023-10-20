const battleService = require("../services/battleService");
const pokemonService = require("../services/pokemonService");
const usersService = require("../services/usersService");

module.exports = {
  async newUser(req,res)
  {
    try
    {
      const { name, age, dateOfBirth, email, cellphone, password, nickname } = req.body;
      await usersService.addUser(name,age,dateOfBirth,email,cellphone,password,nickname)
      res.json({ message: "Novo usuário criado com sucesso!"});
    }
    catch(e)
    {
      return res.status(400).json({        
        success: false,
        error: e.message ? "Erro ao criar usuário: "+e.message : "Erro ao criar usuário.",
      });
    }

  },
  
  async editUser(req,res)
  {
    try
    {
      const id = req.params.id
      const { name, age, dateOfBirth, email, cellphone, password, nickname } = req.body
      await usersService.updateUser(id,name,age,dateOfBirth,email,cellphone,password,nickname)
      res.json({ message: "Usuário editado com sucesso!"});
    }
    catch(e)
    {
      return res.status(400).json({        
        success: false,
        error: e.message ? "Erro ao editar usuário: "+e.message : "Erro ao editar usuário.",
      });
    }


  },

  async deleteUser(req,res)
  {
    try
    {
      const { id } = req.params.id;
      await usersService.deleteUser(id)
      res.json({ message: "Usuário excluído com sucesso!"});
    }
    catch(e)
    {
      return res.status(400).json({        
        success: false,
        error: e.message ? "Erro ao excluir usuário: "+e.message : "Erro ao excluir usuário.",
      });
    }
  }
};
