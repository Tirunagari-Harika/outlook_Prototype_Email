import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import CONSTANTS from "../../constants/constants";
import CONFIG from "../../config/config";
import utilities from "../../utilities/utilities";

const MailItem = (props) => {

    const classes = ["mail-item"];
    if (props.unread) classes.push("unread");
    if (props.flagged) classes.push("flagged");
    if (props.active) classes.push("activeMailItem");

    const deletionHandler = (ev) => {
        ev.stopPropagation();
        props.deleteMailItem(props.mId);
    }

    const markUnRead = (ev) => {
        // mark the item as unread
        ev.stopPropagation();
        props.markItemAsUnRead(props.mId);
    }

    const markFlagged = (ev) => {
        ev.stopPropagation();
        props.flagMailItem(props.mId, !props.flagged);
    }

    const setFlagState = () => {
        return props.flagged === true ?
            CONSTANTS.mail_controls_flags_Rep.unflag :
            CONSTANTS.mail_controls_flags_Rep.flag;
    }


    return (<div
        className={classes.join(" ")}
        onClick={props.onClickHandler.bind(null, props.mId, props.unread)}>
        <div className={"icons"}>
            {props.unread === false ?
                (<div onClick={markUnRead}>{CONSTANTS.mail_controls_flags_Rep.unread}</div>) :
                (<div></div>)}
            {props.showDeleteIcon === true ?
                (<div onClick={deletionHandler}>{CONSTANTS.mail_controls_flags_Rep.delete}</div>) :
                (<div></div>)}

            <div onClick={markFlagged}>{setFlagState()}</div>
        </div>
        <div className="subject">
            {utilities.limitingChars(props.subject, CONFIG.mailbox_subject_limitChars)}
        </div>
        <div className="mail_body">
            {utilities.limitingChars(props.content, CONFIG.mailbox_mailBody_limitChars)}
        </div>

    </div>)
}

export default MailItem;

MailItem.propTypes = {
    unread: PropTypes.bool.isRequired,
    flagged: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    mId: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    markItemAsUnRead: PropTypes.func.isRequired,
    flagMailItem: PropTypes.func.isRequired,
    deleteMailItem: PropTypes.func.isRequired,
    showDeleteIcon: PropTypes.bool.isRequired
}