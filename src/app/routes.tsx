import {RouteObject} from "react-router-dom";
import {NotFound} from "../pages/404";
import React from "react";
import Event from "../pages/Event";
import Events from "../pages/Events";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Events />,
        errorElement: <NotFound />
    },
    {
        path: '/event/:identifier',
        element: <Event />
    },
    {
        path: '/events/',
        element: <Events />
    }
];

export default routes;
