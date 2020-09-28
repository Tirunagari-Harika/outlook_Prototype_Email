const filter_control_mapping1 = {
    all: "",
    unread: "UR",
    read: "R",
    flag: "F",
    unflag: "UF"
};

const mail_Keys1 = {
    unread: "unread",
    mId: "mId",
    flagged: "flagged",
    subject: "subject",
    content: "content",
    delete: "delete"
};

const CONSTANTS = {
    service_status_message: {
        loading: "Connecting to Server",
        updating: "Updating... All folders",
        success: "All folders are updated...",
        error: "Unable to fetch from Servers..."
    },
    service_status: {
        loading: "loading",
        success: "success",
        error: "error",
        waiting: "waiting"
    },
    mail_area: {
        header: "Select an item to read",
        sub_header: "Nothing is selected"
    },

    mail_controls_flags_Rep: {
        flag: "F",
        unflag: "UF",
        unread: "UR",
        delete: "D"
    },
    invalid_route: {
        header: "404 Page Not Found",
        sub_header: "Please select valid page..."
    },

    filter_control_mapping: filter_control_mapping1,
    mail_Keys: mail_Keys1,

    filter_controls: [
        { key: "All", value: filter_control_mapping1.all },
        { key: "Flag", value: filter_control_mapping1.flag },
        { key: "UnFlag", value: filter_control_mapping1.unflag },
        { key: "Read", value: filter_control_mapping1.read },
        { key: "UnRead", value: filter_control_mapping1.unread }
    ],
    mail_data: "mail_data",
    folder_data: "folder_data"
}

export default CONSTANTS;

/* default_filterControl: {
    key: mail_Keys1.flagged,
    mappedKey: filter_control_mapping1.flag,
    value: true
} */