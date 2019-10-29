import React, { Component } from 'react';
import { Form, Input, DatePicker, Button, Row, Col, Table } from 'antd'
import PageHeader from '@com/PageHeader'   // 页头
import { Breadcrumb } from 'antd'
import style from './deal.scss'
import { Link } from 'react-router-dom';
import { checkJson, getSearchString } from '@common/common'
import api from '@api/methodIndex'
const { RangePicker } = DatePicker;
const ProductListColumns = [
    {
        title: '订单编号',
        dataIndex: 'ordernum',
        key: 'ordernum',
        width: '100px',
    },
    {
        title: '商品名称',
        dataIndex: 'productname',
        key: 'productname',
        width: '100px',
    },
    {
        title: '商品编码',
        dataIndex: 'commoditycode',
        key: 'commoditycode',
        width: '100px',
    },
    {
        title: '钢企编码',
        dataIndex: 'materialcode',
        key: 'materialcode',
        width: '100px',
    },
    {
        title: '规格型号',
        dataIndex: 'omspecificationtype',
        key: 'omspecificationtype',
        align: 'center',
        width: '100px',
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: '100px',
    },
    {
        title: '订购数量',
        dataIndex: 'quantityordered',
        key: 'quantityordered',
        align: 'center',
        width: '100px',
    },
    {
        title: '单位',
        dataIndex: 'unitname',
        key: 'unitname',
        align: 'center',
        width: '100px',
    },
    {
        title: '开票数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 100,

    },
    {
        title: '税率',
        dataIndex: 'taxrate',
        key: 'taxrate',
        width: 100,

    }
]
class InvoDetial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernid: getSearchString(window.location.search, 'ordernid'),
            datalist: [],

            
        }
    }

    render() {
        var datalist = this.state.datalist
        console.log(datalist);
        
        const elements = datalist.map((item) =>
            <div>
                <PageHeader pagetitle='基本信息'></PageHeader>
                <Row style={{ padding: '10px' }}>
                    <Col span={5}>合同编号：<span>{item.contractnum}</span></Col>
                    <Col span={9}>采购商名称：<span>{item.purchaser}</span></Col>
                    <Col span={9}>发票抬头：<span>{item.invoicehead}</span></Col>
                </Row>
                <Row style={{ padding: '10px' }}>
                    <Col span={5}>发票代码：<span>{item.invoicenum}</span></Col>
                    <Col span={9}>开票日期：<span>{item.invoicedate}</span></Col>
                    <Col span={9}>含税金额(元)：<span>{item.tax}</span></Col>
                </Row>
                <Row style={{ padding: '10px' }}>
                    <Col span={24}>未含税金额(元)：<span>{item.untax}</span></Col>

                </Row>
                <Table columns={ProductListColumns} dataSource={item.invoiceDetailData} style={{marginBottom:'20px'}}/>
            </div>
        )
        return (
            <div className={style.bigbox}>
                <div className={style.content}>
                    <Breadcrumb className='breadcrumb'>
                        <Breadcrumb.Item ><Link to='/seller/deal/invo'><span className='normal'>发票管理 </span></Link></Breadcrumb.Item>
                        <Breadcrumb.Item><span className='now'>发票详情 </span></Breadcrumb.Item>
                    </Breadcrumb>
                    {elements}
                    <Row>
                        <Button type="primary" className="square-btn" style={{ marginLeft: '45%', marginRight: '10px' }}  onClick={this.clickFn}>新增</Button>
                        <Button type="primary" className="square-btn" onClick={this.Printing} >打印</Button>
                    </Row>

                </div>
            </div>
        )
    }



    componentDidMount() {
        this.loadData()
        console.log(this.state.datalist);
        

    }
    loadData() {
        api.CheckInvoiceOrder({ ordernid: this.state.ordernid }).then(res => {
            let resData = checkJson(res);
            console.log(resData);
            if (resData) {

                this.setState({
                    datalist: resData.invoiceData,
                })
                console.log(this.state.datalist);
                console.log(this.state.datalist.invoiceNid);
            }


        })
    }
    //新增
    clickFn = ()=>{
    let nidlist=[]
        for(var i = 0 ; i<this.state.datalist.length;i++){
            nidlist= this.state.datalist[i].invoiceNid
        }
console.log(nidlist);


        
        let param={
            pathname: `/seller/deal/invoNewlyIncreased`,
            
            state:{
                invoiceNid:nidlist,
                ordernid:this.state.ordernid
            }
        }
        console.log(param)

        this.props.history.push(param);
    }


    //打印
    Printing = () => {
        let param = {
          pathname: `/seller/deal/invodayin`,
          state: {
            ordernid:this.state.ordernid,
          }
        }
        console.log('history.push(param)=', param)
        this.props.history.push(param);
      }
}
export default InvoDetial

