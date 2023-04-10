const express = require('express');
const router = express.Router();
const db = require('../db');
const {authorize, isCustomer} = require("../middlewares/auth");

router.route('/')
.get(authorize, isCustomer, async(req, res) => {
    try{
        const orders = await db.query('SELECT * FROM orders JOIN order_items ON id=order_id JOIN product p ON p.id=product_id WHERE customer_id = $1 ORDER BY order_id DESC', [1]);
        res.status(200).json(orders.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.message);
    }
})
.post(authorize, isCustomer, async(req, res) => {
    try{
        // get cart items
        const items = await db.query('SELECT * FROM cart JOIN (SELECT id, price FROM product) t ON t.id=product_id WHERE customer_id = $1', [1]);
        if(!items.rows.length){
            res.status(403).send("No items in cart");
        }

        // make order
        const order = await db.query('INSERT INTO orders(customer_id, date) VALUES($1, $2) RETURNING id', [1, new Date()]);
        
        
        items.rows.forEach(async(item)=>{
            // insert order items
            await db.query('INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1, $2, $3, $4)', [order.rows[0].id, item.product_id, item.quantity, item.price*item.quantity]);
            // decrese product stock
            await db.query('UPDATE product SET stock = stock - $1 where id = $2', [item.quantity, item.product_id]);
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
