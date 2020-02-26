import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const UserIDGuard = props => {
    if (localStorage.getItem("token")) {
        return props.children;
    }
    //If not logged in, redirects to login
    return <Redirect to={"/login"} />;
};