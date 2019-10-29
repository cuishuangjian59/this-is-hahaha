// 发货页面 

import React from 'react';
import { Col, Row, Empty, Form, Table, Divider, Pagination } from 'antd';
import PageHeader from '@com/PageHeader'; // 页头
import SendFilterForm from './SendFilterForm';    // 用于搜索的表单
import { Link } from 'react-router-dom';
import style from './deal.scss'
import { checkJson } from '@common/common'
import api from '@api/methodIndex'

const ProductListColumns = [
    {
        title: '订单编号',
        dataIndex: 'ordernum',
        key: 'ordernum',

        width: '150px',
    },
    {
        title: '合同编号',
        dataIndex: 'contractnum',
        key: 'contractnum',
        width: '150px',
    },
    {
        title: '采购商',
        dataIndex: 'purchaser',
        key: 'purchaser',
        align: 'center',
        width: '150px',
    },
    {
        title: '订单数量',
        dataIndex: 'quantityordered',
        key: 'quantityordered',
        align: 'right',
        width: '100px',
    },
    {
        title: '已发货数量',
        dataIndex: 'sendcargo',
        key: 'sendcargo',
        align: 'right',
        width: '100px',
    },
    {
        title: '未已发货数量',
        dataIndex: 'nocargo',
        key: 'nocargo',
        align: 'right',
        width: '110px',
    },
    {
        title: '发货时间',
        dataIndex: 'sendtime',
        key: 'sendtime',
        align: 'center',
        width: '150px',
    },
    {
        title: '操作',
        dataIndex: 'reason',
        key: 'reason',
        fixed: 'right',
        align: 'center',
        width: '140px',
        render: (text, record) => {
            console.log(record);
            
            return <span>
                <Link to={`/seller/deal/senddetails?ordernum=${record.ordernum}`}>查看明细</Link>
                <Divider type="vertical" />
                <Link to={`/seller/deal/shipments?ordernid=${record.ordernid}`}>发货</Link>

            </span>
        }

    }
]




class Send extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pageTotal: '',
            current: '1',
            pageSize: '10',
            ordernum: '',
            ordernid:'',
        }
    }

    render() {

        return (
            <div className={style.bigbox}>
                <div className={style.content}>
                    <PageHeader pagetitle='发货管理'></PageHeader>
                    <SendFilterForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        searchEnter={this.searchEnter.bind(this)}
                        setParams={this.setParams.bind(this)}
                    // showTableLoading={this.showTableLoading.bind(this)}
                    />
                    <Table columns={ProductListColumns} dataSource={this.state.dataSource} pagination={false} scroll={{ x: 1300 }}  style ={{marginBottom:'20px'}}/>
                    <Pagination
                        total={this.state.pageTotal}
                        showTotal={this.showTotal}
                        pageSize={this.state.pageSize}
                        onChange={this.pageChange}
                        defaultCurrent={1}
                        style={{ float: 'right', padding: '0px 0px 20px' }}
                    />
                </div>
            </div>
        )
    }

    showTotal(total) {
        //console.log(range)
        return `总共${total}条`

    }


    componentDidMount() {
        this.Dataload()
    }
    Dataload() {
        let params = {
            pageSize: 10,//分组状态
            pageNum: 1,
        }
        api.ShippingManagement(params).then(res => {
            let resData = checkJson(res);
            console.log(resData);
            if (resData) {
                this.setState({
                    dataSource: resData.sendorders,
                    pageTotal: resData.pageTotal,
                    pageSize: resData.pageSize,
                })
            }
        })
    }
    // 翻页
    pageChange(page) {

        let params = {
            pageSize: 10,
            pageNum: page//页码
        }


        // console.log(this.formRef.getItemsValue());     //6、调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        params = Object.assign({}, params, this.formRef.getItemsValue())
        api.ShippingManagement(params).then(res => {      // 调用订单管理列表查询接口接口
            console.log(res);

            let resData = checkJson(res);
            console.log(res)
            if (resData) {
                console.log('setState');
                this.setState({
                    loading: false,
                    pageTotal: resData.pageTotal,
                    pageSize: resData.pageSize,
                    params: params
                })
            }
        })
    }
    //当父组件有删除等操作，须拿到参数重新请求列表，这里获取参数
    setParams(params) {
        this.setState({ params })
    }
    showTableLoading() {
        this.setState({ loading: true })
    }
    // 搜索过滤 
    searchEnter(resData) {
        console.log(resData)
        this.setState({
            dataSource: resData.sendorders,
            pageTotal: resData.pageTotal,
            pageSize: resData.pageSize,
            loading: false
        })
    }

}


export default Send;

