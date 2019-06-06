import React from 'react'

const AddBlogForm = ({ handleAdd, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
    return(
    <div>
        <form onSubmit={handleAdd}>
            Otsikko: <input type="text" value={title} name="title" onChange={handleTitleChange} />
            Tekijä: <input type="text" value={author} name="title" onChange={handleAuthorChange} />
            URL: <input type="text" value={url} name="title" onChange={handleUrlChange} />
            <br></br>
            <button type="submit">Lisää</button>
        </form>
    </div>
    )
}

export default AddBlogForm