const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/auth');
const { verifyAdminPermission } = require('../middlewares/adminValidation');
const { validateProductData } = require('../middlewares/productValidation');
const ProductController = require('../controllers/ProductController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - stock
 *         - sku
 *       properties:
 *         _id: 
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         category:
 *           type: string
 *           description: Product category
 *         brand:
 *           type: string
 *           description: Product brand
 *         price:
 *           type: number
 *           description: Product price
 *         discount:
 *           type: number
 *           description: Price discount
 *         stock:
 *           type: number
 *           description: Product Stock
 *         sku:
 *           type: number
 *           description: Unique identification code
 *         weight:
 *           type: number
 *           description: Product weight
 *         dimensions:
 *           type: object
 *           properties:
 *             height:
 *               type: number
 *               description: Product height
 *             width:
 *               type: number
 *               description: Product width
 *             depth:
 *               type: number
 *               description: Product depth
 *         attributes:
 *           type: object
 *           properties:
 *             color:
 *               type: string
 *               description: Product color
 *             material:
 *               type: string
 *               description: Product material   
 *         gallery:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Image'
 *              
 */

/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Retrieves a list of products
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
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
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server Error
 */
router.get('/', validateToken, ProductController.listProducts);

/**
 * @swagger
 * /v1/products/{id}:
 *   get:
 *     summary: Retrieves an product by ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product object
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
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server Error
 * 
 */
router.get('/:id', validateToken, ProductController.getProduct);

/**
 * @swagger
 * /v1/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 required: true
 *               description:
 *                 type: string
 *                 description: Product description
 *                 required: true
 *               category:
 *                 type: string
 *                 description: Product category
 *               brand:
 *                 type: string
 *                 description: Product brand
 *               price:
 *                 type: number
 *                 description: Product price
 *                 required: true
 *               discount:
 *                 type: number
 *                 description: Price discount
 *               stock:
 *                 type: number
 *                 description: Product Stock
 *                 required: true
 *               sku:
 *                 type: number
 *                 description: Unique identification code
 *                 required: true
 *               weight:
 *                 type: number
 *                 description: Product weight
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     description: Product height
 *                   width:
 *                     type: number
 *                     description: Product width
 *                   depth:
 *                     type: number
 *                     description: Product depth
 *               attributes:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     description: Product color
 *                   material:
 *                     type: string
 *                     description: Product material
 *     responses:
 *       201:
 *         description: The product was successfuly created
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
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       500:
 *         description: Server Error
 */
router.post('/create', [validateToken, verifyAdminPermission, validateProductData], ProductController.createProduct);

/**
 * @swagger
 * /v1/products/update/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 required: true
 *               description:
 *                 type: string
 *                 description: Product description
 *                 required: true
 *               category:
 *                 type: string
 *                 description: Product category
 *               brand:
 *                 type: string
 *                 description: Product brand
 *               price:
 *                 type: number
 *                 description: Product price
 *                 required: true
 *               discount:
 *                 type: number
 *                 description: Price discount
 *               stock:
 *                 type: number
 *                 description: Product Stock
 *                 required: true
 *               sku:
 *                 type: number
 *                 description: Unique identification code
 *                 required: true
 *               weight:
 *                 type: number
 *                 description: Product weight
 *               dimensions:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     description: Product height
 *                   width:
 *                     type: number
 *                     description: Product width
 *                   depth:
 *                     type: number
 *                     description: Product depth
 *               attributes:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     description: Product color
 *                   material:
 *                     type: string
 *                     description: Product material
 *     responses:
 *       200:
 *         description: The product was successfuly updated
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server Error
 */
router.put('/update/:id', [validateToken, verifyAdminPermission, validateProductData], ProductController.updateProduct);

/**
 * @swagger
 * /v1/products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product id
 *     responses:
 *       200:
 *         description: The product was successfuly deleted
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server Error
 */
router.delete('/delete/:id', [validateToken, verifyAdminPermission], ProductController.deleteProduct);

module.exports = router;