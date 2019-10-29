import React from 'react';
import { Col, Row, Empty, Form, Table, Drawer, Button, Pagination } from 'antd';
import PageHeader from '@com/PageHeader'; // 页头
import InvoFilterForm from './InvoFilterForm';    // 用于搜索的表单
import InvoCard from './InvoCard';    // 用于搜索的表单
import { Link } from 'react-router-dom';
import style from './deal.scss'
import { checkJson } from '@common/common'
import api from '@api/methodIndex'
class Invo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dataSource: [],
            pageTotal: '',
            current: '1',
            pageSize: '10',
        };
    }

    render() {

        return (
            <div className={style.bigbox}>
                <div className={style.content}>
                    <PageHeader pagetitle='发票管理'></PageHeader>
                    <InvoFilterForm
                        wrappedComponentRef={(form) => this.formRef = form}
                        searchEnter={this.searchEnter.bind(this)}
                        setParams={this.setParams.bind(this)}
                    />
                    <InvoCard cardList={this.state.dataSource} />
                    <Pagination
                        total={this.state.pageTotal}
                        showTotal={this.showTotal}
                        pageSize={this.state.pageSize}
                        onChange={this.pageChange.bind(this)}
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
        this.loadData()
    }
    loadData() {
        let params = {
            pageSize: 10,//分组状态
            pageNum: 1,
        }
        api.InvoiceManagement(params).then(res => {
            let resData = checkJson(res);

            console.log(resData);
            if (resData) {
                this.setState({
                    dataSource: resData.invoiceData,
                    pageTotal: resData.pageTotal,
                    pageSize: resData.pageSize,
                })
            }

        })
    }

    pageChange(page) {

        let params = {
            pageSize: 10,
            pageNum: page//页码
        }
        // console.log(this.formRef.getItemsValue());     //6、调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        // params = Object.assign({}, params, this.formRef.getItemsValue())
        api.InvoiceManagement(params).then(res => {      // 调用订单管理列表查询接口接口
            console.log(res);

            let resData = checkJson(res);
            console.log(res)
            if (resData) {
                this.setState({
                    loading: false,
                    dataSource: resData.invoiceData,
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
            dataSource: resData.invoiceData,
            pageTotal: resData.pageTotal,
            pageSize: resData.pageSize,
            loading: false
        })
    }

}


export default Invo;
