const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/auth');

const User = require('../models/User');

module.exports = class AuthController {

    static async generateToken(req, res) {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result) {
                    const token = generateToken({id: user.id, email: user.email, name: user.name, admin: user.admin});
                    res.status(200).json({ 
                        token: token 
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'User credentials are incorrect'
                    });
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found with this e-mail'
            });
        }
    }
}