import React from "react";
import "./styles.css";
import MailItem from "../MailItem";
import FilterControl from "../FilterControl";
import outlookPrototypeContext from "../../context";
import utilities from "../../utilities/utilities";
import CONSTANTS from "../../constants/constants";
import CONFIG from "../../config/config";
import ROUTES from "../../constants/routes";

const MailBoxContainer = (props) => {

    const ctx = React.useContext(outlookPrototypeContext);
    const routeKey = props.match.params.mailbox;
    const isInitialMountRef = React.useRef(true);

    // stores mId
    const [activeMailItem, setactiveMailItem] = React.useState(null);
    const [controlKey, setControlKey] = React.useState({ ...ctx.defaultFilterControl });


    React.useEffect(() => {
        if (isInitialMountRef.current === false) {
            setactiveMailItem(null);
            setControlKey({ ...ctx.defaultFilterControl });
        }
        isInitialMountRef.current = false;
    }, [routeKey]);

    const validatemId = (mId) => {
        if (!mId) {
            props.history.push({
                pathname: `/${ROUTES.pageNotFound}`
            })
            return false;
        }
        return true;
    }


    const onClickHandler = (mId, readValue) => {
        // the mail item has to become read. if it is unread
        if (validatemId(mId)) {
            setactiveMailItem(mId);
            if (readValue === true) {
                ctx.markMailItemReadOrUnRead(routeKey, mId, false);
            }

            props.history.push({
                pathname: `/${ROUTES.folders}/${routeKey}/${mId}`
            });
        }
    }

    const markItemAsUnRead = (mId) => {
        if (validatemId(mId)) {
            ctx.markMailItemReadOrUnRead(routeKey, mId, true);
        }
    }

    const flagMailItem = (mId, value) => {
        if (validatemId(mId)) {
            ctx.markFlagOnItem(routeKey, mId, value);
        }
    }

    const deleteMailItem = (mId) => {
        if (validatemId(mId)) {
            ctx.deletionHandler(routeKey, mId);
        }
    }

    const dropdownChangeHandler = (val) => {
        switch (val) {
            case CONSTANTS.filter_control_mapping.flag:
                setControlKey({
                    key: CONSTANTS.mail_Keys.flagged,
                    mappedKey: CONSTANTS.filter_control_mapping.flag,
                    value: true
                });
                break;
            case CONSTANTS.filter_control_mapping.unflag:
                setControlKey({
                    key: CONSTANTS.mail_Keys.flagged,
                    mappedKey: CONSTANTS.filter_control_mapping.unflag,
                    value: false
                });
                break;
            case CONSTANTS.filter_control_mapping.read:
                setControlKey({
                    key: CONSTANTS.mail_Keys.unread,
                    mappedKey: CONSTANTS.filter_control_mapping.read,
                    value: false
                });
                break;
            case CONSTANTS.filter_control_mapping.unread:
                setControlKey({
                    key: CONSTANTS.mail_Keys.unread,
                    mappedKey: CONSTANTS.filter_control_mapping.unread,
                    value: true
                });
                break;
            default:
                setControlKey({
                    key: "",
                    mappedKey: CONSTANTS.filter_control_mapping.all,
                    value: true
                });
        }
    }

    const compareFunc = (ele) => {
        if (controlKey.key && ele[controlKey.key] !== controlKey.value) {
            return false;
        }
        return true;
    }

    return (
        <div className={"mailbox-container"}>
            <FilterControl
                initialSelectedOption={ctx.defaultFilterControl.mappedKey}
                dropdownChangeHandler={dropdownChangeHandler} />

            {!utilities.isEmptyObject(ctx.mailBoxItems) &&
                ctx.mailBoxItems[routeKey] &&
                !utilities.isEmptyArr(ctx.mailBoxItems[routeKey]) &&

                ctx.mailBoxItems[routeKey].map((ele) => {
                    if (compareFunc(ele)) {
                        return (<MailItem
                            {...ele}
                            key={ele.mId}
                            active={ele.mId === activeMailItem}
                            onClickHandler={onClickHandler}
                            markItemAsUnRead={markItemAsUnRead}
                            flagMailItem={flagMailItem}
                            deleteMailItem={deleteMailItem}
                            showDeleteIcon={routeKey === CONFIG.resources_deletionFolder ? false : true}
                        />)
                    }
                    return null;
                })}
        </div>)
}

export default MailBoxContainer;