const route = require('express').Router();
const {registerController,loginController} = require('../controller/auth')

route.post('/register', registerController);
route.post('/login', loginController);

module.exports = {
    route
}



