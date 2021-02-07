import { useState, useEffect } from 'react';
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import moment from "moment";

import {Detail} from "../../components/Resource";
import {config} from "./config";

import MainLayout from "../../components/MainLayout"

import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Space,
    Divider,
    Row,
    Col,
} from 'antd';

// Edit
export default withTranslation()((props) => {

    const Fielder = ({values, setValues})=>{

        return(
            <Form
                name="basic"
                initialValues={values}
                onFinish={values => setValues(values)}
                labelCol={{span: 6}}
                wrapperCol={{span: 14 }}
            >
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '内容不可为空' }]}
                >
                    <Input />
                </Form.Item>

                <Divider />

                <Row>
                    <Col offset={6} span={14}>
                        <Form.Item >
                            <Space size={16}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                                <Link to={"/"+config.name}>
                                    <Button>返回</Button>
                                </Link>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }

    return <MainLayout>
        {/*<Detail props={props} fielder={Fielder} {...config} />*/}
        <Detail props={props} fielder={Fielder} name={config.name} label={"编辑"+config.label} />
    </MainLayout>

})