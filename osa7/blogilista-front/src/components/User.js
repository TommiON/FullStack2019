import React from 'react'

const User = ( {user} ) => {
    return(
        <div>{user.name}, {user.blogs.length} blogs created </div>
    )
}

export default User