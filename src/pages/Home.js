import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

// providers
// import {jsonFetchPost} from '../providers/baseProvider';

// components
import Hello from "../components/Hello";
import Nav from "../components/Nav";

// Home
export default withTranslation()(({ t, i18n }) => {

    // return
    return <div>
        <h1>
            <Hello />
        </h1>
        <Nav />
    </div>
})