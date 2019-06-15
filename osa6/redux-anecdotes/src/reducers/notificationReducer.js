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