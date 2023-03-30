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
