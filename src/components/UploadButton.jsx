import React, {useState, useRef, useEffect} from "react";

function UploadButton() {


        const [selectedImage, setSelectedImage] = useState(null);

        useEffect(() => {
                if(selectedImage) console.log(selectedImage)
        })

        return (
            <div>
                <h1>Upload and Display Image usign React Hook's</h1>
                {selectedImage && (
                    <div>
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <button onClick={()=>setSelectedImage(null)}>Remove</button>
                    </div>
                )}
                <br />

                <br />
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </div>
        );
}

export default UploadButton;