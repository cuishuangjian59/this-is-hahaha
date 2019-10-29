import React from 'react';
import { Col, Row, Empty, Form, Table, Pagination, Modal, message,Spin } from 'antd';
import PageHeader from '@com/PageHeader'; // 页头
import BookedFilterForm from './BookedFilterForm';    // 用于搜索的表单
import { Link } from 'react-router-dom';
import style from './deal.scss'
import { checkJson } from '@common/common'
import api from '@api/methodIndex'
import stateEnum from '@common/status' //枚举类方法 
import { ProductListColumns } from './BookrdTable'
const { confirm } = Modal;




class Booked extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading:true
        }
    }

    render() {

        return (
            <Spin tip="Loading..." spinning={this.state.loading}>
                <div className={style.bigbox}>
                    <div className={style.content}>
                        <PageHeader pagetitle='入账管理'></PageHeader>
                        <BookedFilterForm
                            wrappedComponentRef={(form) => this.formRef = form}
                            searchEnter={this.searchEnter.bind(this)}
                            setParams={this.setParams.bind(this)}
                        />
                        <Table columns={ProductListColumns(this)} dataSource={this.state.dataSource} pagination={false} style={{ marginBottom: '20px' }} />
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
            </Spin>
        )
    }

    clickbtn() {
        alert(1)
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
        api.EnterAccount(params).then(res => {
            let resData = checkJson(res);

            if (resData) {
                this.setState({
                    dataSource: resData.accountDataList,
                    pageTotal: resData.pageTotal,
                    pageSize: resData.pageSize,
                    loading:false,
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
        api.EnterAccount(params).then(res => {      // 调用订单管理列表查询接口接口
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
            dataSource: resData.accountDataList,
            pageTotal: resData.pageTotal,
            pageSize: resData.pageSize,
            loading: false
        })
    }
    //入账
    clickbtn = (paymentnid, ordernid) => {
        let that = this
        confirm({
            title: '是否确认该笔付款进行入账？',
            onOk() {
                console.log('OK');
                api.updEnteraccount({ models: { paymentnid: paymentnid, ordernid: ordernid } }).then(res => {
                    let resData = checkJson(res);
                    console.log(resData);
                    if (resData) {
                        message.success('入账成功')
                        that.setState({ loading: true })
                        that.loadData()
                    }

                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }



}


export default Booked;

