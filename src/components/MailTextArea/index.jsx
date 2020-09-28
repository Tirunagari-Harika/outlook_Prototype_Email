import React from "react";
import "./styles.css";
import outlookPrototypeContext from "../../context";
import ROUTES from "../../constants/routes";

const MailTextArea = (props) => {
    console.log("MailTextArea", props);
    const ctx = React.useContext(outlookPrototypeContext);

    const [loading, setLoading] = React.useState(true);
    const [mailObj, setmailObj] = React.useState({ subject: "", content: "" });

    const isMountRef = React.useRef(null);

    React.useEffect(() => {
        isMountRef.current = true;
        return () => {
            isMountRef.current = false;
        }
    });


    React.useEffect(() => {
        let routeKey = props.match.params.mailbox;
        let mId = props.match.params.id;

        if (!mId || mId === "null" || mId === "undefined") {
            props.history.push({
                pathname: `/${ROUTES.pageNotFound}`
            });
            return;
        }

        let res = ctx.getMailItem(routeKey, mId);
        if (res === null) {
            props.history.push({
                pathname: `/${ROUTES.pageNotFound}`
            });
        } else if (res.data === null) {
            props.history.push({
                pathname: res.routePath
            });
        }
        else if (isMountRef.current) {
            setLoading(false);
            setmailObj({
                subject: res.data.subject,
                content: res.data.content
            });
        }

    }, [props.match.params.mailId, props.match.params.id])

    return (<div className={"mail-text-area"}>
        { loading ? (<div className="loading"> Loading ...</div >) :
            (<React.Fragment>
                <div className="complete_subject">
                    {mailObj.subject}
                </div>
                <div className="complete_mailbody">
                    {mailObj.content}
                </div>
            </React.Fragment>)}

    </div >)
}

export default MailTextArea;