import React from 'react';

const Content = ({name, count}: {name: string, count: number}) => {
    return(
        <div>
            <p>{name} {count}</p>
        </div>
    )
}

export default Content