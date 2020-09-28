import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Footer = (props) => {
    return (<div className="footer">
        <div className={"items"}>
            items: {props.totalItems}
        </div>
        <div>
            {props.status}
        </div>
    </div>)
}

export default Footer;

Footer.propTypes = {
    totalItems: PropTypes.string,
    status: PropTypes.string.isRequired
};

Footer.defaultProps = {
    totalItems: ""
};

