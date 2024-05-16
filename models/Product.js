const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ignoreDeleted } = require('../middlewares/softDeleteMiddlewares');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: null },
    brand: { type: String, default: null },
    
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    
    stock: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    weight: { type: Number, default: null },
    dimensions: {
      height: { type: Number },
      width: { type: Number },
      depth: { type: Number }
    },
    attributes: {
        color: { type: String },
        material: { type: String }
    },

    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

// Soft delete to not lose the product reference
productSchema.methods.softDelete = function() {
    this.deletedAt = new Date();
    return this.save();
};

// Middleware to ignore deleted products
productSchema.pre('find', ignoreDeleted);
productSchema.pre('findOne', ignoreDeleted);
productSchema.pre('findById', ignoreDeleted);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
