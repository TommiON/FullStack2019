import React from "react";
import { useStateValue } from "../state";

const DiagnosisDetails = ({code}: {code: string}) => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();

    const diag = diagnoses[code];
    
    if(diag !== undefined) {
        return(
            <p>{code} {diag.name}</p>
        )
    } else {
        return <div></div>
    }
    
}

export default DiagnosisDetails