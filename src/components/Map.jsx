import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import LoaderSpinner from "./LoaderSpinner";
import React from "react";
import "../components/styles/Map.css"
const MAPS_API_KEY = process.env.MAPS_API_KEY;

export const Map = (props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
    });
    if (!isLoaded) return <LoaderSpinner/>
    return  <GoogleMap zoom={13} center={{lat: props.lat, lng: props.lon}} mapContainerClassName="map-container">
        <Marker position={{lat: props.lat, lng: props.lon}}/>
    </GoogleMap>
}