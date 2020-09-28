import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./styles.css";

const FolderItem = (props) => {
    return (<div className="linkStyles">
        <NavLink to={{ pathname: props.routePath }} activeClassName={"activeClass"}>
            <div className={"folderItem"}>
                <div>{props.linkName}</div>
                <div>[{props.unreads}]</div>
            </div>
        </NavLink>
    </div>)
}

export default FolderItem;

FolderItem.propTypes = {
    linkName: PropTypes.string.isRequired,
    routePath: PropTypes.string,
    unreads: PropTypes.string,
}

FolderItem.defaultProps = {
    routePath: "/",
    unreads: ''
}