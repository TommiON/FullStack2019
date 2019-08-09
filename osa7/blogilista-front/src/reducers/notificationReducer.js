const notificationReducer = (state = '', action) => {
    if(action.type === 'NOTIFY') {
        return action.data
    }
    if(action.type === 'WIPE') {
        return ''
    }
    return state
}

export default notificationReducer