const Product = require('../models/Product');

async function validateProductData(req, res, next) {
    let productData = req.body;
    const productId = req.params.id ?? null;
    const errors = [];

    if(productData.name === undefined) {
        errors.push('The product name field is required');
    } else if (typeof productData.name !== 'string') {
        errors.push('The product name must be a string');
    }

    if(productData.description === undefined) {
        errors.push('The product description field is required');
    } else if (typeof productData.description !== 'string') {
        errors.push('The product description must be a string');
    }

    if(productData.price === undefined) {
        errors.push('The product price field is required');
    } else if (typeof productData.price !== 'number') {
        errors.push('The product price must be a number');
    }

    if(productData.sku === undefined) {
        errors.push('The product sku field is required');
    } else if (typeof productData.sku !== 'string') {
        errors.push('The product sku must be a string');
    } else {
        const sameSkuProduct = await Product.findOne({sku: productData.sku}).lean();
        if(sameSkuProduct) {
            if(!productId || sameSkuProduct._id.toString() !== productId) {
                errors.push('A product with this sku was already created');
            }
        }
    }

    if (productData.category !== undefined && typeof productData.category !== 'string') {
        errors.push('The product category must be a string');
    }

    if (productData.brand !== undefined && typeof productData.brand !== 'string') {
        errors.push('The product brand must be a string');
    }

    if (productData.discount !== undefined && typeof productData.discount !== 'number') {
        errors.push('The product discount must be a number');
    }

    if (productData.stock !== undefined && typeof productData.stock !== 'number') {
        errors.push('The product stock must be a number');
    }

    if (productData.weight !== undefined && typeof productData.weight !== 'number') {
        errors.push('The product weight must be a number');
    }

    if (productData.dimensions !== undefined && typeof productData.dimensions !== 'object') {
        errors.push('The product dimensions must be an object (height, width, depth)');
    } else {
        if (productData.dimensions.height !== undefined && typeof productData.dimensions.height !== 'number') {
            errors.push('The product height must be a number');
        }
        if (productData.dimensions.width !== undefined && typeof productData.dimensions.width !== 'number') {
            errors.push('The product width must be a number');
        }
        if (productData.dimensions.depth !== undefined && typeof productData.dimensions.depth !== 'number') {
            errors.push('The product depth must be a number');
        }
    }

    if (productData.attributes !== undefined && typeof productData.attributes !== 'object') {
        errors.push('The product attributes must be an object (color, material)');
    } else {
        if (productData.attributes.color !== undefined && typeof productData.attributes.color !== 'string') {
            errors.push('The product color must be a string');
        }
        if (productData.attributes.material !== undefined && typeof productData.attributes.material !== 'string') {
            errors.push('The product material must be a string');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Errors in product data sent`,
            errors: errors
        });
    }
    next();
}

module.exports = {
    validateProductData
}