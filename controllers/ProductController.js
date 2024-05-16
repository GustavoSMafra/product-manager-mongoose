const Product = require('../models/Product');
const firebaseAdmin = require('firebase-admin');

module.exports = class ProductsController {
    
    static async listProducts(req, res) {
        try {
            const products = await Product.find().populate('gallery').lean();
            res.status(200).json({
                success: true,
                message: 'Products find successfully',
                data: products
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to list products: ${err.message}`
            });
        }
    }

    static async getProduct(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.findById(id).populate('gallery');
            if(product){
                res.status(200).json({
                    success: true,
                    message: 'Product find successfully',
                    data: product
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to list products: ${err.message}`
            });
        }
    }

    static async createProduct(req, res) {
        
        const { 
            name, 
            description, 
            category, 
            brand, 
            price, 
            discount,
            stock,
            sku,
            weight,
            dimensions,
            attributes
        } = req.body

        try {
            const newProduct = {
                name: name, 
                description: description, 
                category: category, 
                brand: brand, 
                price: price, 
                discount: discount,
                stock: stock,
                sku: sku,
                weight: weight,
                dimensions: dimensions,
                attributes: attributes
            }
            const product = new Product(newProduct);
            await product.save();
            res.status(201).json({
                success: true,
                message: 'Product registered successfully',
                data: product
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to register the product: ${err.message}`
            });
        }
    }

    static async updateProduct(req, res) {
        const id = req.params.id;
        const { 
            name, 
            description, 
            category, 
            brand, 
            price, 
            discount,
            stock,
            sku,
            weight,
            dimensions,
            attributes
        } = req.body
        
        const updatedAt = Date.now();
        try {
            const product = {
                name: name, 
                description: description, 
                category: category, 
                brand: brand, 
                price: price, 
                discount: discount,
                stock: stock,
                sku: sku,
                weight: weight,
                dimensions: dimensions,
                attributes: attributes,
                updatedAt: updatedAt
            };
            const updateProduct = await Product.updateOne({_id: id}, product);
            if(updateProduct.matchedCount > 0){
                res.status(200).json({
                    success: true,
                    message: 'Product updated successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to update the product: ${err.message}`
            });
        }
    }

    static async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const deletedProduct = await Product.findById(id);
            if(deletedProduct) {
                deletedProduct.softDelete();
                res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to delete product: ${err.message}`
            });
        }
    }
}