const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.passowrd != req.body.passowrd) {
            return res.json(422, {
                message: "Invalid username or password"
            })
        }

        return res.json(200, {
            message: "sign in successful, here is your token, keep it safe",
            data : {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        })

    } catch {
        console.log('******', err)
        return res.json(500, {
            message: "internal server error"
        });
    }
}