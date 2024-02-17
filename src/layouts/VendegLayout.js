import React from "react";

import { Outlet } from "react-router-dom";
import Navigacio from "../pages/Navigacio";

export default function VendegLayout() {
    return (
        <>
            <Navigacio />

            <Outlet />
        </>
    );
}
