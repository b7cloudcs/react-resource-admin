// Resource.js
import { useState, useEffect } from 'react';
// import { withTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

import {
  getIndex,
  getShow,
  postCreate,
  putEdit,
  deleteDelete,
} from '../providers/resourceProvider';

import {
    Table, Pagination, Divider,
    Form, Row, Col, Input, Button,
    Popconfirm, message
} from 'antd';

// 列表
export const Resource = ({name, label, columns, filter}) => {

    // 数据模版
    const [dataSource, setDataSource] = useState([])
    const [dataTotal, setDataTotal] = useState(0)
    const dataColumns = columns

    // 设置过滤器
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [filterValues, setFilterValues] = useState({})

    // 默认组件
    const defaultFilter = ({values, setValues})=>{
        return(<div>
          <Form
                  name="basic"
                  initialValues={values}
                  onFinish={values => setValues(values)}
                >
                {/* <Form.Item
                  label="关键字"
                  name="q"
                >
                  <Input />
                </Form.Item>
                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    过滤
                  </Button>
                </Form.Item> */}
                <Link to={"/" + name + "/create"}>
                  <Button type="primary">
                    新建
                  </Button>
                </Link>
            </Form>
            <Divider />
        </div>)
    }

    // 组件属性
    const Filter = filter || defaultFilter

    // 初始数据
    useEffect(() => {

      // start & limit
      const start = (page - 1) * pageSize
      const limit = pageSize

      // 拉取数据
      getIndex(name, {
        "_start": start,
        "_limit": limit,
        ...filterValues,
      }).then(response => {
        setDataTotal(response.headers.get("X-Total-Count"))
        return response.json()
      }).then(data => {
        setDataSource(data)
      })

    }, [
      page,
      pageSize,
      filterValues,
    ]);

    // 页面切换
    const changePage = (page, pageSize)=> {
      setPage(page)
      setPageSize(pageSize)
    }

    return (<div>

        <h1>{label}</h1>

        <Divider />

        <Filter values={filterValues} setValues={setFilterValues} />

        <Table
          dataSource={dataSource}
          columns={dataColumns}
          rowKey="id"
          pagination={false}
        />

        <br></br>

        <Pagination
          total={dataTotal}
          showTotal={(total, range) => `当前 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
          current={page}
          pageSize={pageSize}
          showSizeChanger
          onChange={changePage}
        />

    </div>);

}

// 查看和编辑
export const Detail = ({
                           name, label, // config
                           fielder, // 字段
                           props, //props
}) => {

    // vars
    const id = props.match.params.id ?? null
    const Fielder = fielder
    const [values, setValues] = useState({})

    //load
    useEffect(() => {
        // show
        getShow(name, id).then(response => {
          return response.json()
        }).then(data => {
          setValues(data)
        }).catch((error)=>{})
    }, []);


    // update
    const putValues = values => {

        // new
        if(id == null){
            // post
            postCreate(name, values).then(data => {

                // 创建成功
                message.success({
                    content: "创建成功",
                    className: 'custom-class',
                    duration: 2,
                    style: {
                        marginTop: '10vh',
                    },
                })

                // back
                props.history.push({pathname: "/" + name})

            }).catch((error)=>{})
            return
        }


        // 组装id
        values.id = parseInt(id) ?? null

        // put edit
        putEdit(name, values).then(response => {
            return response.json()
        }).then(data => {

            // 修改成功
            message.success({
                content: "修改成功",
                className: 'custom-class',
                duration: 2,
                style: {
                  marginTop: '10vh',
                },
            })

            // back
            props.history.push({pathname: "/" + name})
        })
    }

    return (<div>

      <h1>
          {label}
      </h1>

      <Divider />

      {
        JSON.stringify(values) !== '{}'
          ? <Fielder values={values} setValues={putValues} />
          : null
      }

    </div>);

}

// 删除
export const Delete = ({name, id, children}) => {

  // confirm
  const confirm = () => {
    // put
    deleteDelete(name, id).then(data => {
      // 删除成功
      message.success({
        content: "删除成功",
        className: 'custom-class',
        duration: 2,
        style: {
          marginTop: '10vh',
        },
      })
      // reload
      setTimeout(()=>{
        window.location.reload()
      }, 1000)
    }).catch((error)=>{})
  }

  return (<Popconfirm
      title="确认要删除吗?"
      onConfirm={confirm}
      okText="确认"
      cancelText="再想想"
    >
    {children}
  </Popconfirm>);

}