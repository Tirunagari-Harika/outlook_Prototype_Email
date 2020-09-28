import CONSTANTS from "../constants/constants";

const CONFIG = {
    default_filterControl: {
        key: "",
        mappedKey: CONSTANTS.filter_control_mapping.all,
        value: true
    },
    resources_deletionFolder: "deleted",
    mailbox_subject_limitChars: 15,
    mailbox_mailBody_limitChars: 25,
}

export default CONFIG;

/* default_filterControl: {
    key: CONSTANTS.mail_Keys.flagged,
    mappedKey: CONSTANTS.filter_control_mapping.flag,
    value: true
} */

/* default_filterControl: {
    key: "",
    mappedKey: CONSTANTS.filter_control_mapping.all,
    value: true
}, */