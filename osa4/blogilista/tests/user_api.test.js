const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const testUsers = [
    {
        "username": "Tommi",
        "name": "Tommi",
        "password": "salaisuus"
    },
    {
        "username": "Ha",
        "name": "Hanna",
        "password": "salaisuus"
    },
    {
        "username": "Kauko",
        "name": "Kauko"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let user = new User(testUsers[0])
    await user.save()
})

describe('Uuden käyttäjän luominen', () => {
    test('onnistuu normaalissa tilanteessa', async () => {
        const result = await api.get('/api/users')
        expect(result.body.length).toBe(1)
    })

    test('estetään jos käyttäjätunnus varattu', async () => {
        let user = new User(testUsers[0])
        await api.post('/api/users').send(user).expect(400)
    })

    test('estetään jos käyttäjätunnus liian lyhyt', async () => {
        let user = new User(testUsers[1])
        await api.post('/api/users').send(user).expect(400)
    })

    test('estetään jos salasana puuttuu', async () => {
        let user = new User(testUsers[2])
        await api.post('/api/users').send(user).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
