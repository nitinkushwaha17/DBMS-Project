const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/')
.get(async(req, res) => {
    try{
        const orders = await db.query('SELECT * FROM orders WHERE customer_id = $1', [1]);
        res.status(200).json(orders);
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
})
.post(async(req, res) => {
    try{
        const items = await db.query('SELECT * FROM cart JOIN (SELECT id, price FROM product) t ON t.id=product_id WHERE customer_id = $1', [1]);
        if(!items.rows.length){
            res.status(403).send("No items in cart");
        }

        const order = await db.query('INSERT INTO orders(customer_id, date) VALUES($1, $2) RETURNING id', [1, new Date()]);
        
        items.rows.forEach(async(item)=>{
            await db.query('INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1, $2, $3, $4)', [order.rows[0].id, item.product_id, item.quantity, item.price*item.quantity]);
        });

        await db.query('DELETE FROM cart WHERE customer_id = $1', [1]);

        res.status(201).send("Order created");
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;
