import React from "react";
import { withRouter } from "react-router";
import "./styles.css";
import PropTypes from "prop-types";
import CONSTANTS from "../../constants/constants";

const FilterControl = (props) => {
    const [selectedOption, setSelectedOption] = React.useState(props.initialSelectedOption);
    let options = CONSTANTS.filter_controls;

    React.useEffect(() => {
        setSelectedOption(props.initialSelectedOption);
    }, [props.match.params.mailbox]);

    const onChangeHandler = (ev) => {
        setSelectedOption(ev.target.value);
        props.dropdownChangeHandler(ev.target.value);
    }

    return (<select onChange={onChangeHandler} value={selectedOption} className="filterControls">
        {options.map((ele, i) => {
            return (<option value={ele.value} key={i}>{ele.key}</option>)
        })}
    </select>)
}

export default withRouter(FilterControl);

FilterControl.propTypes = {
    initialSelectedOption: PropTypes.string.isRequired,
    dropdownChangeHandler: PropTypes.func.isRequired
}

