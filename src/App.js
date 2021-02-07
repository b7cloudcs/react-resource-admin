import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { withTranslation } from 'react-i18next';

// antd
import("antd/dist/antd.css");
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd';
moment.locale('zh-cn')

// pages
import Home from "./pages/Home";
import About from "./pages/About";

import PostIndex from "./pages/posts/Index"
import PostCreate from "./pages/posts/Create"
import PostShow from "./pages/posts/Show"
import PostEdit from "./pages/posts/Edit"


// App
export default withTranslation()(({ t, i18n }) => {
    // return
    return (<ConfigProvider locale={zhCN}>
        <Router>
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />

                    {/*post resource*/}
                    <Route exact path="/posts" component={PostIndex} />
                    <Route exact path="/posts/create" component={PostCreate} />
                    <Route exact path="/posts/:id" component={PostShow} />
                    <Route exact path="/posts/:id/edit" component={PostEdit} />

                </Switch>
        </Router>
    </ConfigProvider>)
})