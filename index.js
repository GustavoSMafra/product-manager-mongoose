const express = require("express");
const mongoSanitize = require('express-mongo-sanitize');
const firebaseAdmin = require('firebase-admin');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./keys/swaggerConfig');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

const conn = require("./db/conn");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/images', imageRoutes);

const serviceAccount = require("./serviceAccountKey.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: "gs://products-mongoose.appspot.com"
});

app.listen(3000);
