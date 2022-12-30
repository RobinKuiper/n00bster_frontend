import {RouteObject} from "react-router-dom";
import Home from "../pages/Home";
import {NotFound} from "../pages/404";
import React from "react";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />
    }
];

export default routes;
