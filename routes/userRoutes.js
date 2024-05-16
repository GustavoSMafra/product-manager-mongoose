const express = require('express');
const router = express.Router();

const { validateDataCreate, validateDataUpdate, validatePassword, validateAdmin } = require('../middlewares/userValidation');
const { verifyAdminPermission } = require('../middlewares/adminValidation');
const { validateToken } = require('../middlewares/auth');

const UserController = require('../controllers/UserController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - admin
 *       properties:
 *         _id: 
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User e-mail
 *         password:
 *           type: string
 *           description: User password
 *         admin:
 *           type: boolean
 *           description: Admin flag 
 */

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Retrieves a list of users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
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
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Server Error
 */
router.get('/', validateToken, UserController.listUsers);

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Retrieves an user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user object
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
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server Error
 */
router.get('/:id', validateToken, UserController.getUser);

/**
 * @swagger
 * /v1/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: 
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *                 required: true
 *               email:
 *                 type: string
 *                 description: User e-mail
 *                 required: true
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       201:
 *         description: The user was successfuly created
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       500:
 *         description: Server Error
 */
router.post('/create', validateDataCreate, UserController.createUser);

/**
 * @swagger
 * /v1/users/update/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: 
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *                 required: true
 *               email:
 *                 type: string
 *                 description: User e-mail
 *                 required: true
 *     responses:
 *       200:
 *         description: The user was successfuly updated
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server Error
 */
router.put('/update/:id', [validateToken, validateDataUpdate], UserController.updateUser);

/**
 * @swagger
 * /v1/users/change-password/{id}:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  required: true
 *                  description: The new password
 *     responses:
 *       200:
 *         description: The user password was successfuly updated
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server Error
 */
router.put('/change-password/:id', [validateToken, validatePassword], UserController.changePassword);

/**
 * @swagger
 * /v1/users/change-admin/{id}:
 *   put:
 *     summary: Change user admin flag
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                admin:
 *                  type: boolean
 *                  required: true
 *                  description: The admin flag to be changed
 *     responses:
 *       200:
 *         description: The user admin was successfuly updated
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server Error
 */
router.put('/change-admin/:id', [validateToken, validateAdmin], UserController.changeAdmin);

/**
 * @swagger
 * /v1/users/delete/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: The user was successfuly deleted
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server Error
 */
router.delete('/delete/:id', [validateToken, verifyAdminPermission], UserController.deleteUser);

module.exports = router;