if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const db = require('./db');
const auth = require('./middlewares/auth');

const port = process.env.PORT || 3002;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/product'));

app.get('/user', auth, async(req,res)=>{
    console.log(req.user);
});
app.get('/', async(req,res)=>{
    console.log(db);
    res.send("hello, world!");
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});