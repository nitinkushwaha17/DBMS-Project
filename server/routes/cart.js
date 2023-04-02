const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/')
.get(async(req, res) => {
    try{
        const products = await db.query('SELECT * FROM cart');
        res.status(200).json(products);
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }

})
.post(async(req, res) => {
    try{
        const available = await db.query('SELECT stock FROM product WHERE id = $1', [req.body.product_id]);
        console.log(available)
        if(available.rows[0].stock<req.body.quantity){
            return res.status(400).send("Insufficient quantity available");
        }
        const product = await db.query('INSERT INTO cart(customer_id, product_id, quantity) VALUES(1, $1, $2)', [req.body.product_id, req.body.quantity]);
        console.log(product);
        return res.status(200).send("Product added to cart");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;