const express = require('express');
const dotenv  = require('dotenv').config();
                require('./database/connection')()
const User    = require('./models/User');
const port    = process.env.PORT || 8080;

const app = express();

app.get('/', async (req, res) => {
    try {
        let user = await User.create({username: "djkjsks", password: '1234328', role: 'user'})
        console.log(user);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
})

app.get('/:id', (req, res) => {
    res.send(req.params)
})

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})