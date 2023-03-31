import { Router } from 'express';
const router = Router();

import api from '../services/item.js'
import { errorMapper } from '../utils/errorMapper.js';
import { isAuth, isAuthor } from '../middlewares/guards.js';
import { preload } from '../middlewares/preload.js';

router.get('/', async (req, res) => {
    try {
        res.json(await api.getAll(req.query.where));
    } catch (error) {
        res.status(400).json({messagr: 'Bad request'});
    }
});


router.post('/', isAuth(), async (req, res) => {
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        _ownerId: req.user._id
    }
    try {
        const result = await api.create(item);
        res.json(result);
    } catch (error) {
        console.error(error);
        const message = errorMapper(error);
        res.status(400).json({ message });
        // if (message) {
        //     res.status(400).json({ message });
        // } else {
        //     res.status(400).json({ message: 'Request error' }); 
        // }
    }
});


router.get('/:id', preload(api), async (req, res) => {
    res.json(res.locals.item);
});


router.put('/:id', preload(api), isAuthor(), async (req, res) => {
    try {
        const result = await api.updateById(res.locals.item, req.body);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Request error' });
    }
});


router.delete('/:id', preload(api), isAuthor(), async (req, res) => {
    // const id = req.params.id;
    try {
        const result = await api.deleteById(res.locals.item);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Item not found' });
    }
});

export default router;