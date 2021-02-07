import { useState, useEffect } from 'react';
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import moment from "moment";

import {Resource,Delete} from "../../components/Resource";
import {config} from "./config";

import MainLayout from "../../components/MainLayout"

import {
    Form,
    Input,
    Button,
    Select,
    Space,
    Divider,
} from 'antd';


// Index
export default withTranslation()((props) => {

    const { Option } = Select;

    // 列
    const columns = [
        {
            title: '序号',
            render:(text,record,index)=>`${index+1}`,
        },
        // {
        //     title: '标题',
        //     dataIndex: 'title',
        //     key: 'title',
        // },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (any, record) => {
                return <Link to={"/"+ config.name + "/" + record.id}>
                    {record.title}
                </Link>;
            },
        },
        {
            title: '创建于',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (any, record) => {
                return <span>
                {moment(record.created_at).format('lll')}
              </span>;
            },
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (any, record) => {
                return <Space size={16}>
                    <Link to={"/"+ config.name + "/" + record.id + "/edit"}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Link>
                    <Delete id={record.id} {...config}>
                        <Button type="primary" danger>删除</Button>
                    </Delete>
                </Space>;
            },
        },
    ]

    const filter = ({values, setValues})=>{
        return(<div>
            <Form
                name="basic"
                layout="inline"
                initialValues={values}
                onFinish={values => setValues(values)}
            >
                <Form.Item
                    label="所属位置"
                    name="q"
                >
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                </Form.Item>
                <Link to={"/" + config.name + "/create"}>
                    <Button type="primary">
                        新建
                    </Button>
                </Link>
            </Form>
            <Divider />
        </div>)
    }

    return <MainLayout>
        <Resource columns={columns} filter={filter} {...config} />
    </MainLayout>
})