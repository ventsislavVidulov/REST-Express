import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.json([]);
});

router.post('/', (req, res) => {
    console.log(req.body);

    res.end();
});

export default router;