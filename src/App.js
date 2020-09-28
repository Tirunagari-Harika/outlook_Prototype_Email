import React from 'react';
import { Route, withRouter } from "react-router-dom";
import './App.css';
import OutlookEmail from "./components/OutlookEmail";
import InvalidRoute from "./components/InvalidRoute";
import ROUTES from "./constants/routes";


function App(props) {
  console.log(process.env.PUBLIC_URL, props);
  return (
    <React.Fragment>
      {props.location.pathname.indexOf(`${ROUTES.pageNotFound}`) === -1 ? (<OutlookEmail />) : null}
      <Route exact path={`/${ROUTES.pageNotFound}`} component={InvalidRoute} />
    </React.Fragment>
  );
}

export default withRouter(App);
