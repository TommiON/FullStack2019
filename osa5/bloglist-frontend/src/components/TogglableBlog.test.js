import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, findAllByTestId } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import TogglableBlog from './TogglableBlog'
import Blog from './Blog'

afterEach(cleanup)

test('Blogin tietojen näyttäminen/piilottaminen toimii', () => {
    const testUser = {
        username: 'someone'
    }
    
    const blog = {
        title: 'otsikko',
        author: 'tekijä',
        url: 'osoite',
        user: testUser
    }

    const component = render(
        <TogglableBlog key={1} labelText={blog.title}>
          <Blog key={1} blog={blog} />
        </TogglableBlog>
    )

    const clickable = component.container.querySelector('h3')
    fireEvent.click(clickable)
    expect(component.container).toHaveTextContent('tekijä')
})

test('testitesti', () => {
    expect(1).toBe(1)
})