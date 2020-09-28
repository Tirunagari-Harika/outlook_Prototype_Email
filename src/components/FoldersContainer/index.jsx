import React from "react";
import PropTypes from "prop-types";
import outlookPrototypeContext from "../../context";
import "./styles.css";
import FolderItem from "../FolderItem";
import utilities from "../../utilities/utilities";
import CONSTANTS from "../../constants/constants";
import ROUTES from "../../constants/routes";

const FolderContainer = (props) => {
    const ctx = React.useContext(outlookPrototypeContext);

    const setUnRead = (routeKey) => {
        if (!utilities.isEmptyObject(ctx.mailBoxItems) && routeKey) {
            return utilities.calculateSelection(ctx.mailBoxItems[routeKey], CONSTANTS.mail_Keys.unread, true);
        }
        return null;
    }

    const decideRoutePath = (routeKey) => {
        let dd = utilities.stringifyVar(routeKey);
        if (dd) return `/${ROUTES.folders}/${dd}`;
        return `/${ROUTES.pageNotFound}`;
    }

    return (<div className={"filter-container-styles"}>
        {props.folders.map((ele) => {
            return (<FolderItem
                linkName={ele.displayName}
                routePath={decideRoutePath(ele.routeKey)}
                key={ele.folderId}
                unreads={utilities.stringifyVar(setUnRead(ele.routeKey))}
            />)
        })}

    </div>)
}

export default FolderContainer;

const folderType = {
    displayName: PropTypes.string.isRequired,
    routeKey: PropTypes.string.isRequired
}

FolderContainer.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape(folderType))
};
