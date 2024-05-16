const User = require('../models/User');
const validator = require('validator');

function sanitazeData(userData) {
    const sanitizedData = {};

    if (userData.name) {
        sanitizedData.name = validator.escape(userData.name).trim();
    }
    if (userData.email) {
        if (validator.isEmail(userData.email)) {
            sanitizedData.email = validator.trim(userData.email);
        } else {
            return {
                error: "Invalid e-mail"
            }
        }
    }
    if (userData.password) {
        sanitizedData.password = validator.escape(userData.password).trim();
    }
    if (userData.admin !== undefined) {
        sanitizedData.admin = Boolean(userData.admin);
    }

    return sanitizedData;
}

async function validateDataCreate(req, res, next) {
    let userData = req.body;
    const errors = [];

    userData = sanitazeData(userData);

    if(userData.error) {
        errors.push(userData.error);
    } else {
        if(userData.name === undefined) {
            errors.push('The name field is required');
        } else if(typeof userData.name !== 'string') {
            errors.push('The name must be a string');
        }
    
        if(userData.email === undefined) {
            errors.push('The e-mail field is required');
        } else if(typeof userData.email !== 'string') {
            errors.push('The e-mail must be a string');
        } else {
            const user = await User.findOne({email: userData.email}).lean();
            if(user){
                errors.push('An user with this e-mail was found');
            }
        }
    
        if(userData.password === undefined) {
            errors.push('The password field is required');
        } else if(typeof userData.password !== 'string') {
            errors.push('The password must be a string');
        }
    
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Error in data sent for user creation`,
            errors: errors
        });
    }
    req.body = userData;
    next();
}

async function validateDataUpdate(req, res, next) {
    let userData = req.body;
    const errors = [];
    const sender = req.user;

    userData = sanitazeData(userData);

    if(userData.error) {
        errors.push(userData.error);
    } else {
        if(sender.id != req.params.id && sender.admin != true){
            errors.push('To update users you must be an admin');
        }
    
        if(userData.name === undefined) {
            errors.push('The name field is required');
        } else if(typeof userData.name !== 'string') {
            errors.push('The name must be a string');
        }
    
        if(userData.email === undefined) {
            errors.push('The e-mail field is required');
        } else if(typeof userData.email !== 'string') {
            errors.push('The e-mail must be a string');
        } else {
            const user = await User.findOne({email: userData.email}).lean();
            if(user && user._id.toString() != req.params.id){
                errors.push('An user with this e-mail was found');
            }
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Error in data sent for user update`,
            errors: errors
        });
    }
    req.body = userData;
    next();
}

function validatePassword(req, res, next) {
    let userData = req.body;
    const errors = [];
    const sender = req.user;

    userData = sanitazeData(userData);
    if(userData.error) {
        errors.push(userData.error);
    } else {
        if(sender.id != req.params.id){
            errors.push('Only the user can change his own password');
        }

        if(userData.password === undefined) {
            errors.push('The password field is required');
        } else if(typeof userData.password !== 'string') {
            errors.push('The password must be a string');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Error in data sent for change password`,
            errors: errors
        });
    }
    next();
}

function validateAdmin(req, res, next) {
    let userData = req.body;
    const errors = [];
    const sender = req.user;
    
    userData = sanitazeData(userData);
    if(userData.error) {
        errors.push(userData.error);
    } else {
        if(sender.admin != true){
            errors.push('To change the admin option of an user, you muste be an admin');
        }
        
        if(userData.admin === undefined) {
            errors.push('The admin field is required');
        } else if(typeof userData.admin !== 'boolean') {
            errors.push('The admin field must be a boolean');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Error in data sent for change password`,
            errors: errors
        });
    }
    next();
}

module.exports =  {
    validateDataCreate,
    validateDataUpdate,
    validatePassword,
    validateAdmin
};