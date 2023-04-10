const express = require('express');
const router = express.Router();
const db = require('../db');
const {authorize, isCustomer} = require("../middlewares/auth");

router.route('/')
.get(authorize, isCustomer, async(req, res) => {
    try{
        const products = await db.query('SELECT * FROM CART JOIN PRODUCT ON ID = PRODUCT_ID WHERE CUSTOMER_ID = $1', [1]);
        res.status(200).json(products.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }

})
.post(authorize, isCustomer, async(req, res) => {
    try{
        // Check if the sufficient quantity available
        const available = await db.query('SELECT stock FROM product WHERE id = $1', [req.body.product_id]);
        if(available.rows[0].stock<req.body.quantity){
            return res.status(400).send("Insufficient quantity available");
        }

        const prod = await db.query('SELECT product_id from cart where product_id = $1', [req.body.product_id]);
        // if product already in cart
        if(prod.rows.length>0){
            return res.status(403).send("Product already in cart");
        }
        else{
            const product = await db.query('INSERT INTO cart(customer_id, product_id, quantity) VALUES(1, $1, $2)', [req.body.product_id, req.body.quantity]);
        }

        return res.status(200).send("Product added to cart");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.route('/:id')
.put(authorize, isCustomer, async(req, res)=>{
    try{
        if(req.body.quantity <= 0){
            return res.status(400).send("Bad quantity");
        }

        // Check if the sufficient quantity available
        const available = await db.query('SELECT stock FROM product WHERE id = $1', [req.params.id]);
        if(available.rows[0].stock<req.body.quantity){
            return res.status(400).send("Insufficient quantity available");
        }

        const product = await db.query('UPDATE cart SET quantity = $1 where product_id = $2 AND customer_id=1', [req.body.quantity, req.params.id]);
        // No row updated
        if(!product.rowCount){
            return res.status(404).send("Product not found");
        }
        res.status(200).send("product updated");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
})
.delete(authorize, isCustomer, async(req, res) => {
    try{
        const product = await db.query('DELETE FROM cart WHERE product_id=$1 AND customer_id=$2', [req.params.id, 1]);
        console.log(product.rowCount)
        if(!product.rowCount){
            return res.status(204).send();
        }
        console.log(product);
        res.status(200).send("Product deleted from cart");
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;