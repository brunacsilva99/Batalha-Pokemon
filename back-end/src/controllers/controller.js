module.exports = {
    async newBattle(req,res){        

        try{

            return res.status(200).json({
                sucess:true,
                data: ""
            })
        }
        catch (e) {
            return res.status(400).json({
                sucess: false,
                error: e.response ? e.response.data : "There was an error on the server"
            })
        }
    }
}