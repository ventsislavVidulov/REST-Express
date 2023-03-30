import { Router } from 'express';
const router = Router();

import api from '../services/user.js';


router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await api.register(email, password);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await api.login(email, password);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});


export default router;