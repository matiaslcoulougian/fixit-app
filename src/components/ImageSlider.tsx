import React, {useEffect} from "react";
import LoaderSpinner from "./LoaderSpinner";

export const ImageSlider = (props) => {
    useEffect(() => {
        console.log("asdasd propsas d", props.imageUrls)
        console.log(props.imageUrls.slice(1))
    })
    const firstUrl = props.imageUrls[0];
    const urls = props.imageUrls.slice(1);
    return (<div id="carousel-budget" className="carousel slide" data-mdb-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={firstUrl} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={urls[0]} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={urls[1]} className="d-block w-100" alt="..."/>
            </div>
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-mdb-target="#carousel-budget"
            data-mdb-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-mdb-target="#carousel-budget"
            data-mdb-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>)
}

// const ShowImage = (url) => {
//     return(
//         <div className="carousel-item">
//             <img src={url} className="d-block w-100" alt="..."/>
//         </div>
//     )
// }