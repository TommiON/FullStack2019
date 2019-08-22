import React from 'react'
import Table from 'react-bootstrap/Table'

const UserDetails = ( {user} ) => {
    if (user === undefined) { 
        return null
    }
    return(
        <div>
        <h3>{user.name}</h3>
        <h4>added blogs</h4>
        <Table striped><tbody>
        {user.blogs.map(b => <tr key={b.title}><td>{b.title}</td></tr>)}
        </tbody></Table>
        </div>
    )
}

export default UserDetails