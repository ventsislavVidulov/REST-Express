import express from 'express';

// const express = require('express');

const app = express();

app.get('/data/catalog', (req, res) => {
    res.json([])
});

app.listen(3030, () => console.log('REST service started on port 3030'));