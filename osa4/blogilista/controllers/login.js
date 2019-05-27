const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

const User = require('../models/user')

const bodyParser = require('body-parser')
loginRouter.use(bodyParser.json())

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({username: body.username})

    /*
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
    */

    var passwordCorrect = false
    try {
        passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
    } catch(virhe) {
        console.log('virhe', virhe)
    }

    if (!passwordCorrect) {
        return response.status(401).json({error: 'väärä salasana'})
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(200)
    .send( {token, username: user.username, name: user.name} )
})

module.exports = loginRouter