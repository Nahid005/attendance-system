const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectDb = require('./db/db')
const User = require('./model/User');
const { token } = require('morgan');

const app = express();

app.use(express.json())
app.post('/register', async (req, res, next)=> {

    const {name, email, password} = req.body
    
    if(!name || !email || !password) {
        return res.status(400).json ({message: 'invalid data'})
    }

    try{

        let user = await User.findOne({email})
        if(user){
            return res.status(400).json ({message: 'user already exist'})
        }

        user = new User({name, email, password})

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        user.password = hash

        await user.save()
        return res.status(201).json({message: 'create new user', user})

    }catch(e){
        next(e)
    }
})

app.post('/login', async (req, res, next) => {

    const {email, password} = req.body

    try{

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: 'envalide email'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            return res.status(400).json({message: 'envalide password'})
        }

        delete user._doc.password
        const tokenGenarate = jwt.sign(user._doc, 'secret-key')
        res.status(200).json({message: 'login successfully ', tokenGenarate})

    }catch(e){
        next(e)
    }

})

app.get('/private', async (req, res, next)=> {

    let token = req.headers.authorization
    
    if(!token) {
        res.status(401).json({message: 'invalid token'})
    }

    try{
        token = token.split(' ')[1]
        const tokenVerify = jwt.verify(token, 'secret-key')
        const user = await User.findById(tokenVerify._id)

        if(!user){
            res.status(401).json({message: 'invalid token'})
        }

        res.json({message: 'this is a private route'})
    }catch(e) {
        next(e)
    }
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