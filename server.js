const express = require('express');
const app = express();

app.get('/home', (req, res) => {
    res.json({
        message: " Hello World",
    })
})

app.listen(8000, ()=> {
    console.log(" server is running port 8000")
})