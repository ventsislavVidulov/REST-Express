import mongoose from 'mongoose';
import express from 'express';

import cors from './src/middlewares/cors.js';
import itemController from './src/controllers/item.js';
import userController from './src/controllers/user.js'
import { authMiddleware } from './src/middlewares/auth.js';

async function start() {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/rest');
        console.log('DB ready')
    } catch (error) {
        console.log('Erorr connectiong to DB');
        return process.exit(1);
    }
    const app = express();


    app.use(express.json());
    app.use(cors());
    app.use(authMiddleware());

    app.use('/data/catalog', itemController);
    app.use('/users', userController);

    app.listen(3030, () => console.log('REST service started on port 3030'));

}

start();