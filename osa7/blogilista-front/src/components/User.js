// komponentti poistettu käytöstä, toiminnallisuus siirretty App-komponenttiin

import React from 'react'
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom'

const User = ( {user} ) => {
    return(
        <div>
            {user.name}, {user.blogs.length} blogs created
        </div>
    )
}

export default User