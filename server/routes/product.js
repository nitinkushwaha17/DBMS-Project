const express = require('express');
const router = express.Router();
const db = require('../db');
const {authorize, isSupplier} = require("../middlewares/auth");

router.route('/')
.get(async(req, res) => {
    try{
        let sortby = req.query.sortby||'newest';
        switch(sortby){
            case 'newest':
                sortby='id DESC';
                break;
            case 'priceDesc':
                sortby='price DESC';
                break;
            case 'priceAsc':
                sortby='price ASC';
                break;
            default:
                sortby='id DESC';
        }
        const products = await db.query(`SELECT * FROM product ORDER BY ${sortby}`);
        res.status(200).json(products.rows);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})
.post(authorize, isSupplier, async(req, res) => {
    console.log(req.body);
    try{
        // TODO: add supplier id
        const product = await db.query('INSERT INTO product(name, mrp, price, description, stock, img, supplier_id) VALUES($1, $2, $3, $4, $5, $6, $7)', 
        [req.body.name, req.body.mrp, req.body.price, req.body.desc, req.body.stock, req.body.image, req.user.id]);
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
        const product = await db.query(`SELECT * FROM product where id = $1`, [req.params.id]);
        if(!product.rows.length){
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product.rows[0]);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})
.put(authorize, isSupplier, async(req, res)=>{
    try{
        const product = await db.query("UPDATE product SET name = $1, description = $2, mrp = $3, price = $4, stock = $5, img = $6 WHERE id = $7 AND supplier_id = $8",
        [req.body.name, req.body.desc, req.body.mrp, req.body.price, req.body.stock, req.body.image, req.params.id, req.user.id]);
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