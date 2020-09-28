import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./styles.css";

import outlookPrototypeContext from "../../context";
import Header from "../Header";
import Footer from "../Footer";
import useFoldersApi from "../../customhooks/foldersHooks";
import useMailBoxHook from "../../customhooks/MailBoxHook";
import MailBoxContainer from "../MailBoxContainer";
import FolderContainer from "../FoldersContainer";
import MailTextArea from "../MailTextArea";

import utilities from "../../utilities/utilities";
import CONSTANTS from "../../constants/constants";
import CONFIG from "../../config/config";
import ROUTES from "../../constants/routes";



const OutlookEmail = (props) => {

    const { folders, foldersApiStatus } = useFoldersApi();
    const { apiStatus, mailBoxItems, settledStatus, updateMailBox } = useMailBoxHook(folders, foldersApiStatus);
    const isMountRef = React.useRef(null);

    React.useEffect(() => {
        isMountRef.current = true;
        return () => {
            isMountRef.current = false;
        }
    }, []);



    React.useEffect(() => {
        if (isMountRef.current && settledStatus === CONSTANTS.service_status.success) {
            props.history.push({
                pathname: `/${ROUTES.folders}/${ROUTES.defaultMailBoxRoute}`
            })
        }
    }, [settledStatus]);

    const calculateTotalItems = () => {
        if (!utilities.isEmptyObject(mailBoxItems)) {
            let count = 0;
            let arr = Object.values(mailBoxItems);
            count = arr.reduce((accumulator, ele) => {
                return accumulator + ele.length;
            }, count);
            return count;
        }
        return null;
    }

    const setmailStatus = () => {
        if (apiStatus === CONSTANTS.service_status.error || foldersApiStatus === CONSTANTS.service_status.error || settledStatus === CONSTANTS.service_status.error) {
            return CONSTANTS.service_status_message.error;
        }
        if (settledStatus === CONSTANTS.service_status.waiting && foldersApiStatus === CONSTANTS.service_status.loading) {
            return CONSTANTS.service_status_message.loading;
        }
        if (foldersApiStatus === CONSTANTS.service_status.success && settledStatus === CONSTANTS.service_status.waiting) {
            return CONSTANTS.service_status_message.loading;
        }
        if (foldersApiStatus === CONSTANTS.service_status.success && settledStatus === CONSTANTS.service_status.loading) {
            return CONSTANTS.service_status_message.updating;
        }
        return CONSTANTS.service_status_message.success;
    }

    const findItemIndexInFolder = (routeKey, mId) => {
        return utilities.findEleIndex(mailBoxItems[routeKey], CONSTANTS.mail_Keys.mId, mId);
    }

    const formulateMailObj = (data, routePath) => {
        return {
            data,
            routePath
        }
    }

    const getMailItem = (routeKey, mId) => {
        if (isMountRef.current && settledStatus === CONSTANTS.service_status.success) {
            let index = findItemIndexInFolder(routeKey, mId);
            if (index !== -1) {
                return formulateMailObj(mailBoxItems[routeKey][index], `/${ROUTES.pageNotFound}`);
            }
            return formulateMailObj(null, `/${ROUTES.pageNotFound}`);
        } else if (isMountRef.current && settledStatus !== CONSTANTS.service_status.success) {

            return formulateMailObj(null, `/${ROUTES.folders}/${ROUTES.defaultMailBoxRoute}`);
        }
    }

    const changeMailItemControl = (routeKey, mId, key, value) => {
        if (isMountRef.current) {
            let index = findItemIndexInFolder(routeKey, mId);
            if (index !== -1) {
                let mailItems = { ...mailBoxItems, [routeKey]: [...mailBoxItems[routeKey]] };
                mailItems[routeKey][index][key] = value;
                updateMailBox(mailItems);
            }
        }
    }

    const markMailItemReadOrUnRead = (routeKey, mId, readValue) => {
        if (isMountRef.current) {
            changeMailItemControl(routeKey, mId, CONSTANTS.mail_Keys.unread, readValue);
        }
    }

    const markFlagOnItem = (routeKey, mId, flag) => {
        if (isMountRef.current) {
            changeMailItemControl(routeKey, mId, CONSTANTS.mail_Keys.flagged, flag);
        }

    }

    const deletionHandler = (routeKey, mId) => {
        if (isMountRef.current) {
            let index = findItemIndexInFolder(routeKey, mId);
            if (index !== -1) {
                let mailItems = {
                    ...mailBoxItems,
                    [routeKey]: [...mailBoxItems[routeKey]],
                    [CONFIG.resources_deletionFolder]: [...mailBoxItems[CONFIG.resources_deletionFolder]]
                };

                let arr = mailItems[routeKey].splice(index, 1);

                mailItems = {
                    ...mailItems,
                    [CONFIG.resources_deletionFolder]: [
                        ...mailItems[CONFIG.resources_deletionFolder],
                        ...arr
                    ]
                }
                updateMailBox(mailItems);
            }
        }

    }


    const ctxVal = {
        mailBoxItems,
        defaultFilterControl: CONFIG.default_filterControl,
        markMailItemReadOrUnRead,
        markFlagOnItem,
        deletionHandler,
        getMailItem
    }

    return (<React.Fragment>
        <Header />
        <outlookPrototypeContext.Provider value={ctxVal}>
            <div className={"outlook-proto"}>
                {foldersApiStatus === CONSTANTS.service_status.success ? (<React.Fragment>

                    <FolderContainer folders={folders} />
                    <Route path={`/${ROUTES.folders}/:mailbox`} component={MailBoxContainer} />
                    <Route path={`/${ROUTES.folders}/:mailbox/:id`} component={MailTextArea} />

                </React.Fragment>) : null}

                {/*  <NoMailSelected /> */}
            </div>
            <Footer totalItems={utilities.stringifyVar(calculateTotalItems())} status={setmailStatus()} />
        </outlookPrototypeContext.Provider>

    </React.Fragment>)
}

export default withRouter(OutlookEmail);