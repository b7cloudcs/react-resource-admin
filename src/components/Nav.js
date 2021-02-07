import { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

// Nav
export default withTranslation()(({ t, i18n }) => {

    // return
    return <>
        <Link to={"/"}>Home</Link> | <Link to={"/about"}>About</Link> | <Link to={"/posts"}>Posts</Link>
    </>
})