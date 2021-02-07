import { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Space,
} from 'antd';

import {
  PictureOutlined,
  FileWordOutlined,
  InsertRowBelowOutlined,
  BuildOutlined,
  ContainerOutlined,
  SolutionOutlined,
  WifiOutlined,
  SmileOutlined,
  IdcardOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';

// import {
//   userInfo,
//   userSignOut,
//   userPermissions,
// } from '../providers/authProvider';

// Nav
export default withTranslation()(({ t, i18n, children }) => {

    const { Header, Sider, Content } = Layout;

    const [username, setUsername] = useState("...")
    const [role, setRole] = useState("")

    // 拉取用户状态
    useEffect(() => {
        // userInfo().then(data => {
        //     setUsername(data.title)
        // })
        // userPermissions().then(role => {
        //     setRole(role)
        // })
    }, []);

    // 登出用户
    const signOut = ()=>{
        // userSignOut().then(()=>{
        //     router.push("/")
        // })
    }

    return (<>
                <Layout id="main-layout" style={{height:"100vh"}}>
                    <Sider collapsible>
                        <div className="logo">
                            菜单
                        </div>

                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                            <Menu.Item key="1" icon={<PictureOutlined />}>
                                <Link to="/posts">Posts</Link>
                            </Menu.Item>

                        </Menu>

                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            <div></div>
                            <Space size={8}>
                                {username}
                                <Button className='exit' onClick={signOut}>退出</Button>
                            </Space>
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </>);
})