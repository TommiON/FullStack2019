import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const testBlog = {
    title: 'otsikko',
    author: 'tekijä',
    likes: 0
}

test('Renderöi blogin tiedot', () => {    
    const component = render(
        <SimpleBlog blog={testBlog} />
    )

    expect(component.container).toHaveTextContent('otsikko')
    expect(component.container).toHaveTextContent('tekijä')
    expect(component.container).toHaveTextContent('has 0')
})

test('Tapahtumakäsittelijää kutsutaan', async () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={testBlog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockHandler.mock.calls.length).toBe(2)
})
