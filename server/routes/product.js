const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/')
.get(async(req, res) => {
    try{
        const products = await db.query('SELECT * FROM product');
        res.status(200).json(products.rows);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})
.post(async(req, res) => {
    console.log(req.body);
    res.status(201).send("Product created successfully");
})


router.route('/:id')
.get(async(req, res) => {
    try{
        const product = await db.query(`SELECT * FROM product where id = ${req.params.id}`);
        if(!product.rows.length){
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product.rows);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;