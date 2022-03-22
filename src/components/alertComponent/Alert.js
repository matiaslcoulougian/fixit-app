import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";

function AlertComponent(props) {
    const [alert, setAlert] = useState(false);

    const handleClose = () => {
        setAlert(false);
        props.hideError(null);
    }
    const handleShow = () => {
        setAlert(true);
    }

    useEffect(() => {
        if(props.errorMessage !== null) {
            handleShow()
        } else {
            handleClose()
        }
    });

    return (
        <div>
            <span>{props.errorMessage}</span>
            <Modal alert={alert} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invalid data!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default AlertComponent;