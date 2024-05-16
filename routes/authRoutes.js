const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

/**
 * @swagger
 * /v1/auth/generate-token:
 *   post:
 *     summary: Generate auth token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request (Check the problem in the API return)
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server Error
 */
router.post('/generate-token', AuthController.generateToken);

module.exports = router;