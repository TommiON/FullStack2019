export const setMessage = (message, duration) => {
    return async dispatch => {
        dispatch({
            type: 'UPDATE',
            data: message
        })
        await setTimeout(() => dispatch({
            type: 'RESET'
        }), duration*1000)
    }
}

export const publishMessage = (message) => {
    return {
        type: 'UPDATE',
        data: message
    }
}

export const resetMessage = () => {
    return {
        type: 'RESET'
    }
}

const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'UPDATE':
            return action.data
        case 'RESET':
            return ''
        default:
            return state
    }
}

export default notificationReducer