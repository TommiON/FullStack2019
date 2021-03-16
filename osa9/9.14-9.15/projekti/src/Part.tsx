import React from 'react';
import {CoursePart} from './types'

const Part = ({part}: {part: CoursePart}) => {
    
    switch(part.type) {
        case "described":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>{part.description} </p>
                </div>
            )
        case "groupProject":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>project exercises {part.groupProjectCount} </p>
                </div>
            )
        case "submission":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>{part.description} </p>
                    <p>submit to {part.exerciseSubmissionLink}</p>
                </div>
            )
        case "special":
            return(
                <div>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>{part.description} </p>
                    <p>required skills: {part.requirements.map(requirement => <div key={requirement}>{requirement} </div>)}</p>
                </div>
        )
        default:
            return(<p></p>)
    }
}

export default Part