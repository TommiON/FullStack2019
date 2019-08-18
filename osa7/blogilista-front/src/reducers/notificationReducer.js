const notificationReducer = (state = '', action) => {
    if(action.type === 'NOTIFY') {
        return action.data
    }
    if(action.type === 'WIPE') {
        return ''
    }
    return state
}

export const publishMessage = (message) => {
    return {
        type: 'NOTIFY',
        data: message
    }
}

export const wipeMessage = () => {
    return {
        type: 'WIPE'
    }
}

export default notificationReducer