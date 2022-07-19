import React from "react";

const LoaderSpinner = (props) => {

    return(
        <div className={`d-flex justify-content-center ${props.style}`}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoaderSpinner;