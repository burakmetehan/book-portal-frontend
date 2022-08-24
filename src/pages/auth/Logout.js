import React from "react";

import { Button } from "antd";

export default function Logout({ setIsAuthenticated }) {
    function onClickHandle() {
        localStorage.clear();
        sessionStorage.clear();
        setIsAuthenticated(false);

    }
    return (
        <Button
            onClick={onClickHandle}
        >
            Logout
        </Button>
    );
}