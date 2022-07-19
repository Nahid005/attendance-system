const express = require('express');
const connectDb = require('./db/db')
const authentication = require('./middleware/authentication')
const routes = require('./route')

const app = express();

app.use(express.json())
app.use(routes)

app.get('/private', authentication, (_req, res,)=> {
    return res.json({message: 'this is a private route'})
})

app.use((err, _req, res, _next) => {
    console.log(err)
    res.status(500).json({message: 'this is a server error'})
})

connectDb('mongodb://localhost:27017/attendance_system', {
    
})

.then(()=> {
    console.log('database connected ')
    app.listen(8000, ()=> {
        console.log(" server is running port 8000")
    })
})

.catch( (e)=> {
    console.log(e)
})