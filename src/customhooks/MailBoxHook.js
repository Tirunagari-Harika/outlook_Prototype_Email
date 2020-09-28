import React from "react";
import { getRequest } from "../services/serviceApis";
import CONSTANTS from "../constants/constants";
import utilities from "../utilities/utilities";
import { sessionstore } from "../store/sessionstore";

const useMailBoxHook = (foldersJson, folderApiStatus) => {

    const [mailBoxItems, setMailBoxItems] = React.useState(utilities.getParsedSessionData(CONSTANTS.mail_data));
    const [settledStatus, setsettledStatus] = React.useState(CONSTANTS.service_status.waiting);
    const [apiStatus, setapiStatus] = React.useState(CONSTANTS.service_status.waiting);

    const statusObj = {
        fulfilled: "fulfilled",
        rejected: "rejected"
    }

    const updateMailBox = (data) => {
        let ssdata = JSON.stringify(data);
        sessionstore.set(CONSTANTS.mail_data, ssdata);
        setMailBoxItems(data);
    }

    const formHttpCalls = () => {
        return foldersJson.map((ele) => {
            return getRequest(ele.folderApiUrl);
        });
    }

    const mapToMailBoxState = (res) => {
        let mailBox = {};
        let apiStatus = CONSTANTS.service_status.success;

        for (let i = 0; i < res.length; i++) {
            if (res[i].status === statusObj.fulfilled) {
                mailBox = {
                    ...mailBox,
                    [foldersJson[i].routeKey]: res[i].value.data
                };
            } else {
                mailBox = {
                    ...mailBox,
                    [foldersJson[i].routeKey]: []
                }

                apiStatus = CONSTANTS.service_status.error;
            }
        }

        setapiStatus(apiStatus);
        updateMailBox(mailBox);
        setsettledStatus(CONSTANTS.service_status.success);

    }

    const apiCalls = () => {
        setapiStatus(CONSTANTS.service_status.loading);
        setsettledStatus(CONSTANTS.service_status.loading);
        Promise.allSettled([...formHttpCalls()]).then((res) => {
            mapToMailBoxState(res);

        }).catch((err) => {
            console.log("useMailBoxHook: ", err);
        });
    }

    React.useEffect(() => {
        if (folderApiStatus === CONSTANTS.service_status.success &&
            utilities.isEmptyObject(mailBoxItems)) {
            apiCalls();
            return;
        } else if (folderApiStatus === CONSTANTS.service_status.success && !utilities.isEmptyObject(mailBoxItems)) {
            setsettledStatus(CONSTANTS.service_status.success);
            setapiStatus(CONSTANTS.service_status.success);
        }
    }, [folderApiStatus]);


    return {
        mailBoxItems,
        apiStatus,
        settledStatus,
        updateMailBox
    }
}

export default useMailBoxHook;
