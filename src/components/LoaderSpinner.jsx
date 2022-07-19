import {TailSpin} from "react-loader-spinner";
import React from "react";

const LoaderSpinner = () => {

    return(
        <div className={"d-flex justify-content-center"}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoaderSpinner;