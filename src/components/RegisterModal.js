import {Link} from "react-router-dom";
import React from "react";
import './styles/RegisterModal.css'

const Modal = props => {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-body">
                    Congrats {props.name}! Your account was created successfully!
                </div>
                <Link to="/"><button>
                    Go to app
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Modal