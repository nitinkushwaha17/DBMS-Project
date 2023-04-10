if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
var cors = require('cors')
const db = require('./db');

const port = process.env.PORT || 3002;

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/product'));
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/order', require('./routes/order'));

app.get('/user', async(req,res)=>{
    console.log(req.user);
});
app.get('/', async(req,res)=>{
    res.send("hello, world!");
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});