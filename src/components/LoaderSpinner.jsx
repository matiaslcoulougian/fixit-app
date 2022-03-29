import {TailSpin} from "react-loader-spinner";

const LoaderSpinner = (props) => {
    if (!props.show) {
        return null;
    }
    return(
        <TailSpin
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
        />
    )
}

export default LoaderSpinner;