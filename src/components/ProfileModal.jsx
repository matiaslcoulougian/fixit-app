import React, {useState} from "react";
import {Modal} from "@mui/material";
import {useMutation} from "@apollo/client";
import {ADD_WORKER_IMAGE} from "../queries/mutations";
import profile from "./pages/no-profile.png";
import "../components/styles/Profile.css";
const S3 = require('aws-sdk/clients/s3');

const config = {bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};

const s3 = new S3(config);

export const ProfileModal = (props) => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const handleFileEvent = (e) => {
        console.log(props.me.id)
        console.log(props.me.profileUrl)
        setFile(e.target.files[0]);
        const newUrl= URL.createObjectURL(e.target.files[0]);
        setPreview(newUrl);
    }

    const [addWorkerImage] = useMutation(
        ADD_WORKER_IMAGE, {
            onCompleted: (res) => {
                console.log(res);
                console.log("WORKED!!!")
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const handleSaveImage = () => {
        const fileName = `${props.me.id}/${file.name}`
        s3.upload({Bucket: process.env.REACT_APP_BUCKET_NAME, Key: fileName, Body: file}, function(err, data) {
            console.log(err, data);
        });
        addWorkerImage({variables: {input: {profileKey: fileName}}})
        props.setOpenModal(false)
    }

    return(<Modal
        open={props.openModal}
        onClose={() => props.setOpenModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title" id="modal-title">Profile Picture</h5>
                    <button type="button" className="btn-close" onClick={() => props.setOpenModal(false)} data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body border-0 py-0">
                    <div className="modal-form">
                <div>
                    {!preview && <img src={props.me.profileUrl? props.me.profileUrl : profile} alt={"..."} className="img-thumbnail rounded mx-auto d-block w-50 ali profile-pic"></img>}
                    {preview && <img src={preview} alt={"..."} className="img-thumbnail rounded mx-auto d-block w-50 ali profile-pic"></img>}
                    <br/>
                    <input type="file"
                           accept='image/png, image/*'
                           onChange={handleFileEvent}
                    />
                    <br/>
                    <br/>
                    <button type="button" className="btn btn-primary mb-3 align-content-lg-center" id='reject-button' onClick={handleSaveImage} >Save</button>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>)

}