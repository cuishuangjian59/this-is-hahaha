//发货单

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 插件组件
import { Button, Input, Breadcrumb, Icon, Modal, Radio, message, InputNumber, Empty ,Spin} from 'antd';
import style from '@css/buyer/Implement/productioninvoice.scss'
// import style from '@css/buyer/Orders/Invoice.scss'
import { checkJson, confirmF, getSearchString } from '@common/common';
import PageHeader from "@com/PageHeader";
import api from '@api/methodIndex';
import rules from '@common/rules';
class Invoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ordernid: getSearchString(this.props.location.search, 'ordernid'), //方案id
      contractNum: '',//合同编号
      orderNum: '', //订单编号
      purchaser: '', //采购商名称
      supplier: '', //供应商名称
      carditenlist: [],
      Logisticsn: '',//物流编号
      Logisticsc: '', //物流公司
      Receivedq: '',
      cargoDetailGetDataList: [],
      loading:true
    }
  }
  render() {

    let itemlist = this.state.carditenlist

    const elements = itemlist.map((item) =>

      <li>
        <ol>
          <li style={{ width: '150px' }}><span>{item.productname}</span></li>
          <li style={{ width: '170px' }}><p>规格型号：</p><span>{item.omspecificationtype}</span></li>
          <li style={{ width: '250px' }}><p>商品编码：</p><span>{item.commoditycode}</span></li>
          <li style={{ width: '170px' }}><p>钢企编号：</p><span>{item.materialcode}</span></li>
          <li style={{ width: '150px' }}><p>最小计量单位：</p><span>{item.unit}</span></li>
          <li><p>换算后采购数量：</p><span>{item.quantityordered}</span></li>
          <li style={{ width: '150px' }}><p>未发货数量：</p><span>{item.nocargo}</span></li>
          <li><p>发货数量：</p><span><InputNumber min={1} max={100000} placeholder='请输入' onChange={this.Receivedquantity.bind(this, item, 'sendquantity')} /></span></li>
        </ol>
      </li>


    )
    return (
      <Spin tip="Loading..." spinning={this.state.loading}>
      <div className={style.Productionbox}>
        {/* 面包屑 */}
        <Breadcrumb className='breadcrumb'>
          <Breadcrumb.Item ><Link to='/seller/deal/send'><span className='normal'>发货管理</span></Link></Breadcrumb.Item>
          <Breadcrumb.Item><span className='now'>生成发货单</span></Breadcrumb.Item>
        </Breadcrumb>
        <div className={style.Productioncontent}>
          <PageHeader pagetitle='生成发货单' />
          <div className={style.Screenconditions}>
            <span>
              <p>采购商名称:</p>
              <Input value={this.state.purchaser} />
            </span>
            <span>
              <p>物流编号:</p>
              <Input placeholder="" onChange={this.Logisticsnumber}  oninput = "value=value.replace(/[^\d]/g,'')"/>
            </span>
            <span>
              <p>物流公司:</p>
              <Input placeholder="" onChange={this.Logisticscompany} />
            </span>
          </div>
          <div className={style.Detailsofdelivery}>
            <div className={style.tabs}>
              <span>订单发货明细</span>
              <span><p>订单编号：</p>{this.state.orderNum}</span>
            </div>
            <ul className={style.everys}>
              {elements}
            </ul>
          </div>
          <div className={style.btnbox}>
            <Button type="primary" style={{ 'border-radius': '0', 'margin-right': '20px' }} onClick={this.generate}>生成发货单</Button>
            <Button style={{ 'border-radius': '0' }} onClick={this.Printing}>打印</Button>
          </div>
        </div>
      </div >
      </Spin>
    )
  }
  componentDidMount() {
    api.Shipments({ ordernid: this.state.ordernid }).then(res => {
      let resData = checkJson(res);
      console.log(resData);

      this.setState({
        carditenlist: resData.cargoDetailGetDataList,
        contractNum: resData.contractNum,//合同编号
        orderNum: resData.orderNum, //订单编号
        purchaser: resData.purchaser, //采购商名称
        supplier: resData.supplier, //供应商名称
        loading:false
      });
    });
  }


  Logisticsnumber = (e) => {
    this.state.Logisticsn = e.target.value;
  }
  Logisticscompany = (e) => {
    this.state.Logisticsc = e.target.value;
  }

  //发货数量
  Receivedquantity(item, skey, e) {
    item[skey] = e;
    this.state.Receivedq = e;
   
  }


  //提交
  generate = () => {
    let param = {
      orderNid: this.state.ordernid, // 订单nid
      subordernum: this.state.orderNum, // 订单编号
      contractnum: this.state.contractNum, // 合同编号
      trackingnum: this.state.Logisticsn, // 物流单号
      trackingcompany: this.state.Logisticsc, // 物流公司
      supplier: this.state.supplier, // 供应商
      cargoDetailAddModels: this.state.carditenlist
    }

   
    if (this.state.Logisticsc == '' || this.state.Logisticsn == '' || this.state.Receivedq == '' || this.state.Receivedq === 0) {
      message.error('请填写完整信息');
      return;
    } else {
      this.setState({
        loading:true
  
      })
      api.GenerateInvoice(param).then(res => {

        let resData = checkJson(res);
       
        let param = {
          pathname: `/seller/deal/GenerateInvoice`,
          nid: resData.nid,
          state: {
            ...this.props.location.state,
            nid: resData.nid,
            ordernid:this.state.ordernid,
          }
        }
        console.log(param.state.ordernid);
        
      
        this.props.history.push(param);
      })
    }
  }
  Printing = () => {
    let param = {
      pathname: `/seller/deal/stamp`,
      state: {
        ordernid:this.state.ordernid,
      }
    }
    console.log('history.push(param)=', param)
    this.props.history.push(param);
  }

}

export default Invoice;
