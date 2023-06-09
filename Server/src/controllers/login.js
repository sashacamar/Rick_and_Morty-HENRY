const users = require('../utils/users')

function login (req, res){
    const {email, password} = req.query;
    const user = users.find((person)=>person.email===email&&person.password===password)

    if(user) return res.status(200).json({access: true})
    return res.status(404).json({access: false})
    
}

module.exports= {login};