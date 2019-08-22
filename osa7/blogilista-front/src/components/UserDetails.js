import React from 'react'

const UserDetails = ( {user} ) => {
    if (user === undefined) { 
        return null
    }
    return(
        <div>
        <h3>{user.name}</h3>
        <h4>added blogs</h4>
        <ul>
        {user.blogs.map(b => <li key={b.title}>{b.title}</li>)}
        </ul> 
        </div>
    )
}

export default UserDetails