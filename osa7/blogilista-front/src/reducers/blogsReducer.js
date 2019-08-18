const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD':
            return state.concat(action.data)
        case 'SET':
            return action.data
        default:
            return state
    }   
}

export const addBlog = (newBlog) => {
    return {
        type: 'ADD',
        data: newBlog
    }
}

export const setBlogs = (blogs) => {
    return {
        type: 'SET',
        data: blogs
    }
}

export default blogsReducer