const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const bodyParser = require('body-parser')
usersRouter.use(bodyParser.json())

usersRouter.post('/', async (request, response, next) => {
    try{
        const body = request.body

        if(body.username === undefined ||
            body.username.length < 3 ||
            body.password === undefined ||
            body.password.length < 3) {
                return response.status(400).json({ error: 'virheellinen käyttäjätunnus tai salasana' })
            }

        const users = await User.find({})
        const usernames = users.map(u => u.username)
        if(usernames.includes(body.username)) {
            return response.status(400).json({ error: 'käyttäjätunnus on varattu' })
        }

        const salting = 10
        const passwordHash = await bcrypt.hash(body.password, salting)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    }
    catch (exception) {
        console.log('jotain meni vikaan')
        console.log(exception)
        next(exception)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})



module.exports = usersRouter