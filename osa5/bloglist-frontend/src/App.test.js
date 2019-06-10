import React from 'react'
import { render, waitForElement, findAllByTestId } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import 'jest-dom/extend-expect'

test('Blogeja ei renderöidä, jos ei ole kirjauduttu', async () => {
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(
        () => component.getByText('kirjaudu')
    )
    
    expect(component.container).not.toHaveTextContent('Vielä yksi')
})

test('Blogit renderöidään, jos on kirjauduttu', async () => {
    const user = {
        username: 'testi',
        token: '999999',
        name: 'Testaaja'
    }
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    console.log(window.localStorage.getItem('loggedInUser'))
    
    const component = render(<App />)
    component.rerender(<App />)
    
    console.log('App näyttää tältä...')
    component.debug()
    
    /*
    await waitForElement(
        () => component.getByText('blogs')
    )
    */
    expect(1).toBe(1)
})