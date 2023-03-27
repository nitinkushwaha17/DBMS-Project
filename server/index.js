if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const db = require('./db');

const port = process.env.PORT || 3002;

app.get('/data', async(req,res)=>{
    const data = await db.query("Select * from product");
    console.log(data.rows);
    res.json(data.rows);
});
app.get('/', async(req,res)=>{
    res.send("hello, world!");
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});