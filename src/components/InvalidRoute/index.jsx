import React from "react";
import "./styles.css";
import CONSTANTS from "../../constants/constants";

const InvalidRoute = () => {
    return (<div className={"invalid-routes"}>
        <div>{CONSTANTS.invalid_route.header}</div>
        <div>{CONSTANTS.invalid_route.sub_header}</div>
    </div>)
}

export default InvalidRoute;