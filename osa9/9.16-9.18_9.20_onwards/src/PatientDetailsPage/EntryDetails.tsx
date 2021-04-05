import React from "react";
import { Entry } from '../types';
import DiagnosisDetails from './DiagnosisDetails'

const EntryDetails = ({entry}: {entry: Entry}) => {
    switch (entry.type) {
        case "Hospital":
            return(
                <div>
                    <h3>{entry.date}, <b>HOSPITAL</b></h3>
                    <p>{entry.description}</p>
                    <ul>
                                {entry.diagnosisCodes?.map(d =>
                                    <li key={d}><DiagnosisDetails code={d} /></li>
                                )}
                    </ul>
                    <br></br>
                </div>
            )
        case "HealthCheck":
            return(
                <div>
                    <h3>{entry.date}, <b>HEALTH CHECK</b></h3>
                    <p>{entry.description}</p>
                    <br></br>
                </div>
            )
        case "OccupationalHealthcare":
            return(
                <div>
                    <h3>{entry.date}, <b>OCCUPATIONAL HEALTHCARE</b></h3>
                    <p>{entry.description}</p>
                    <ul>
                                {entry.diagnosisCodes?.map(d =>
                                    <li key={d}><DiagnosisDetails code={d} /></li>
                                )}
                    </ul>
                    <br></br>
                </div>
            )
        default:
            return (<div></div>)
    }


}

export default EntryDetails