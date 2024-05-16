const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserController {
    
    static async listUsers(req, res) {
        try {
            const users = await User.find().select('-password').lean();
            res.status(200).json({
                success: true,
                message: 'Users find successfully',
                data: users
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to list users: ${err.message}`
            });
        }
    }

    static async getUser(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findById(id).select('-password');
            if(user){
                res.status(200).json({
                    success: true,
                    message: 'User find successfully',
                    data: user
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to list users: ${err.message}`
            });
        }
    }

    static async createUser(req, res) {
        const { name, email, password } = req.body;
        try {
            bcrypt.hash(password, 10)
                .then(async hash => {
                    const encryptedPassword = hash;
                    let newUser = {
                        name: name,
                        email: email,
                        password: encryptedPassword,
                        admin: false
                    }
                    const user = new User(newUser);
                    await user.save();
                    res.status(201).json({
                        success: true,
                        message: 'User registered successfully'
                    });
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to register the user: ${err.message}`
            });
        }
    }

    static async updateUser(req, res) {
        const id = req.params.id;
        const { name, email } = req.body;
        try {
            const user = {
                name, 
                email,
            };
            const updateUser = await User.updateOne({_id: id}, user);
            if(updateUser.matchedCount > 0){
                res.status(200).json({
                    success: true,
                    message: 'User updated successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to update the user: ${err.message}`
            });
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const deletedUser = await User.findById(id);
            if(deletedUser) {
                deletedUser.softDelete();
                res.status(200).json({
                    success: true,
                    message: 'User deleted successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to delete user: ${err.message}`
            });
        }
    }

    static async changePassword(req, res) {
        const id = req.params.id;
        try {
            bcrypt.hash(req.body.password, 10)
                .then(async hash => {
                    const encryptedPassword = hash;
                    const user = {
                        password: encryptedPassword,
                    }
                    const updateUser = await User.updateOne({_id: id}, user);
                    if(updateUser.matchedCount > 0){
                        res.status(200).json({
                            success: true,
                            message: 'Password changed'
                        });
                    } else {
                        res.status(404).json({
                            success: false,
                            message: 'User not found'
                        });
                    }
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to change password: ${err.message}`
            });
        }
    }

    static async changeAdmin(req, res) {
        const id = req.params.id;
        try {
            const user = {
                admin: req.body.admin,
            }
            const updateUser = await User.updateOne({_id: id}, user);
            if(updateUser.matchedCount > 0){
                res.status(200).json({
                    success: true,
                    message: 'User changed'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to change admin: ${err.message}`
            });
        }
    }
}