import React, {useEffect} from "react";
import LoaderSpinner from "./LoaderSpinner";

export const ImageSlider = (props) => {
    useEffect(() => {
        console.log("asdasd propsas d", props.imageUrls)
        console.log(props.imageUrls.slice(1))
    })
    const firstUrl = props.imageUrls[0];
    const urls = props.imageUrls.slice(1);

    

    return (
        <div id={"budget-carousel"} className={"carousel slider"} data-bs-ride={"carousel"}>
            <div className={"carousel-inner"}>
                <div className={"carousel-item active"}>
                    <img src={firstUrl} alt={"..."} className="d-block w-100"></img>
                </div>

                {urls.map((url) => {
                    return(<div className={"carousel-item"}>
                        <img src={url} alt={"..."} className="d-block w-100"></img>
                    </div>)
                })}
            </div>

            <a href="#budget-carousel" className={"carousel-control-prev"} role="button" data-bs-slide="prev">
                <span className={"carousel-control-prev-icon"} aria-hidden="true"></span>
                <span className={"visually-hidden"}>Previous</span>
            </a>

            <a href="#budget-carousel" className={"carousel-control-next"} role="button" data-bs-slide="next">
                <span className={"carousel-control-next-icon"} aria-hidden="true"></span>
                <span className={"visually-hidden"}>Next</span>
            </a>

        </div>

    );

}

