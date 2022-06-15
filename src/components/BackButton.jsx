import React from 'react';
import {useNavigate} from "react-router-dom";

const BackButton = (props) => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <button onClick={goBack} className={`btn btn-primary ${props.marginTop} ${props.marginLeft}`}><span><i className="bi bi-arrow-left"></i> Back</span></button>
        </div>
    );
};

export default BackButton;
