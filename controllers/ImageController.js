const Image = require('../models/Image');
const fs = require('fs');
const firebaseAdmin = require('firebase-admin');
const Product = require('../models/Product');

module.exports = class ImageController {

    static async listImagesByProductId(req, res) {
        const productId = req.params.productId;
        try {
            const images = await Image.find({product: productId}).lean();
            res.status(200).json({
                success: true,
                message: 'Images find successfully',
                data: images
            });
        } catch(err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to list images: ${err.message}`
            });
        }
    }

    static async createImage(req, res) {
        const tempFilePath = req.file.path;
        const { name, description, productId } = req.body;
        try {

            const product = await Product.findById(productId);
            if(!product) {
                res.status(404).json({
                    success: true,
                    message: 'Product not found'
                });
            }

            const firebaseBucket = firebaseAdmin.storage().bucket();
            const [imageUpload] = await firebaseBucket.upload(tempFilePath, {
                destination: `uploads/${req.body.name}`,
                metadata: {
                    contentType: req.file.mimetype,
                },
            });
            await imageUpload.makePublic();
            const publicUrl = `https://storage.googleapis.com/${firebaseBucket.name}/uploads/${name}`;
            fs.unlink(tempFilePath, (err) => {
                if (err) {
                    console.error('Error deleting temp file:', err);
                }
            });

            const newImage = {
                name: name,
                description: description,
                product: product._id,
                url: publicUrl
            };
            const image = new Image(newImage);
            await image.save();

            product.gallery.push(image);
            await product.save();

            res.status(201).json({
                success: true,
                message: 'Image registered successfully',
                data: image
            });
        } catch(err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to create image: ${err.message}`
            });
        }
    }

    static async deleteImage(req, res) {
        const id = req.params.id;
        try {
            const deletedImage = await Image.deleteOne({_id: id});
            if(deletedImage) {
                res.status(200).json({
                    success: true,
                    message: 'Image deleted successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Image not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error when trying to delete image: ${err.message}`
            });
        }
    }
}