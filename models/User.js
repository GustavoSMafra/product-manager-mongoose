const moongose = require('mongoose');
const { Schema } = moongose;
const { ignoreDeleted } = require('../middlewares/softDeleteMiddlewares');

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

// Soft delete to not lose the product reference
userSchema.methods.softDelete = function() {
    this.deletedAt = new Date();
    return this.save();
};

// Middleware to ignore products marked as deleted
userSchema.pre('find', ignoreDeleted);
userSchema.pre('findOne', ignoreDeleted);
userSchema.pre('findById', ignoreDeleted);

const User = moongose.model('User', userSchema);
module.exports = User;