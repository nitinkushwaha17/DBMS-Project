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
    try{
        // TODO: add supplier id
        // const product = await db.query('INSERT INTO product(name, mrp, price, description, stock, img) VALUES($1, $2, $3, $4, $5, $6)', 
        // [req.body.name, req.body.mrp, req.body.price, req.body.desc, req.body.stock, req.body.image]);
        // console.log(product);
        res.status(201).send("Product created successfully");
    }
    catch(err){
        res.status(500).send(err.message);
    }
})


router.route('/:id')
.get(async(req, res) => {
    try{
        const product = await db.query(`SELECT * FROM product where id = ${req.params.id}`);
        if(!product.rows.length){
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product.rows[0]);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})
.put(async(req, res)=>{
    try{
        const product = await db.query("UPDATE product SET name = $1, description = $2, mrp = $3, price = $4, stock = $5, img = $6 WHERE id = $7",
        [req.body.name, req.body.desc, req.body.mrp, req.body.price, req.body.stock, req.body.image, req.params.id]);
        if(!product.rowCount){
            return res.status(404).send("product not found");
        }

        res.status(200).send("product updated");
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;