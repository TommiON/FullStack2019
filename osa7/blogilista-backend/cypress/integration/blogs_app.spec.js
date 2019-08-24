describe('Kirjautuminen ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('kirjautumissivu avautuu', function() {
        cy.contains('log in').click()
    })

    it('kirjautuminen onnistuu', function() {
        cy.contains('log in').click()
        cy.get('input:first').type('Hanna')
        cy.get('input:last').type('sekred')
        cy.contains('kirjaudu').click()
        cy.contains('Hanna logged in')
    })
})

describe('Kun ollaan kirjauduttu', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.get('input:first').type('Hanna')
        cy.get('input:last').type('sekred')
        cy.contains('kirjaudu').click()
    })

    it('voi lisätä blogin', function() {
        cy.contains('create new').click()
        cy.get('#title').type('otsikko')
        cy.get('#author').type('tekijä')
        cy.get('#url').type('osoite')
        cy.contains('create').click({force: true})
        cy.visit('http://localhost:3000')
    })
})

describe('Uloskirjautuminen ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.get('input:first').type('Hanna')
        cy.get('input:last').type('sekred')
        cy.contains('kirjaudu').click()
    })

    it('uloskirjautuminen onnistuu', function() {
        cy.contains('logout').click()
        cy.contains('log in')
    })
})

/*
describe('Kun ollaan kirjautuneena', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Hanna',
            username: 'Hanna',
            password: 'sekred'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.contains('log in').click()
    })

    it('kirjautuminen onnistuu', function() {
        cy.contains('log in').click()
        cy.get('input:first').type('Hanna')
        cy.get('input:last').type('sekred')
        cy.contains('kirjaudu').click()
        cy.contains('Hanna logged in')
    })

    it('voi lisätä uuden blogin', function() {
        cy.contains('create new').click()
    })
})
*/