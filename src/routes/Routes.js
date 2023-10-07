import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutIndex from "../layout";
import Home from "../Home";

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<LayoutIndex />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}