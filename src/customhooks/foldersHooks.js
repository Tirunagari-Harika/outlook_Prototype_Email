import React from "react";
import SERVICE_URLS from "../constants/serviceUrls";
import { getRequest } from "../services/serviceApis";
import { sessionstore } from "../store/sessionstore";
import utilities from "../utilities/utilities";
import CONSTANTS from "../constants/constants";

const useFoldersApi = () => {

    const [folders, setFolders] = React.useState(utilities.getParsedSessionData(CONSTANTS.folder_data));
    const [apiStatus, setapiStatus] = React.useState(CONSTANTS.service_status.loading);

    React.useEffect(() => {
        if (utilities.isEmptyObject(folders)) {
            getRequest(SERVICE_URLS.foldersUrls).then((res) => {
                if (utilities.isEmptyArr(res.data)) {
                    setapiStatus(CONSTANTS.service_status.error);
                } else {
                    setFolders(res.data);
                    let ssdata = JSON.stringify(res.data);
                    sessionstore.set(CONSTANTS.folder_data, ssdata);
                    setapiStatus(CONSTANTS.service_status.success);
                }
            }).catch((err) => {
                console.log("useFoldersApi: ", err);
                setapiStatus(CONSTANTS.service_status.error);
            });

            return;
        }
        setapiStatus(CONSTANTS.service_status.success);
    }, []);

    return {
        folders,
        foldersApiStatus: apiStatus
    }

}

export default useFoldersApi;