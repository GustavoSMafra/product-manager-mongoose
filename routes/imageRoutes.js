const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'temp/' });
const { validateToken } = require('../middlewares/auth');
const { verifyAdminPermission } = require('../middlewares/adminValidation');

const ImageController = require('../controllers/ImageController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - product
 *         - url
 *       properties:
 *         _id: 
 *           type: string
 *           description: The auto-generated id of the image
 *         name:
 *           type: string
 *           description: Image name
 *         description:
 *           type: string
 *           description: Image description
 *         product:
 *           type: string
 *           description: UThe auto-generated id of the product
 *         url:
 *           type: boolean
 *           description: Image url
 */

/**
 * @swagger
 * /v1/images/{productId}:
 *   get:
 *     summary: Retrieves all images of the selected product
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the selected product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Message describing the outcome
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 *       500:
 *         description: Server Error
 */
router.get('/:productId', validateToken, ImageController.listImagesByProductId);

/**
 * @swagger
 * /v1/images/create:
 *   post:
 *     summary: Create a new image
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                file:
 *                  type: string
 *                  format: binary
 *                  required: true
 *                name:
 *                  type: string
 *                  required: true
 *                description:
 *                  type: string
 *                  required: true
 *                productId:
 *                  type: string
 *                  required: true
 *     responses:
 *       201:
 *         description: The image was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: Message describing the outcome
 *                 data:
 *                   type: Object
 *                   $ref: '#/components/schemas/Image'
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       500:
 *         description: Server Error
 */
router.post('/create', upload.single('file'), ImageController.createImage);

/**
 * @swagger
 * /v1/images/delete/{id}:
 *   delete:
 *     summary: Delete image
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Image id
 *     responses:
 *       200:
 *         description: The image was successfuly deleted
 *       404:
 *         description: The image was not found
 *       500:
 *         description: Server Error
 */
router.delete('/delete/:id', [validateToken, verifyAdminPermission], ImageController.deleteImage);

module.exports = router;