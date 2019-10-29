//发货单
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 插件组件
import { Button, Input, Breadcrumb, Icon, Modal, Radio, message, InputNumber,Empty } from 'antd';
import style from '@css/buyer/Implement/Invoice.scss'
import { checkJson, confirmF, getSearchString } from '@common/common';
import PageHeader from "@com/PageHeader";
import api from '@api/methodIndex';
class GenerateInvoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nid: this.props.location.state.nid, //方案id
      ordernid:this.props.location.state.ordernid,
      state:this.props.location.state,
      cargoDetailGetDataList: [],
      commoditycode: '',	// 商品编码		
      materialcode: '',	// 钢企编码		
      nocargo: '',	// 未发货数量			
      omspecificationtype: '',	// 规格型号		
      ordernum: '', // 订单编号 订单表 	
      productname: '',	// 商品名称		
      quantityordered: '',	// 换算后采购数量			
      sendquantity: '', // 发货数量			
      unit: '', // 最小计量单位		
      contractNum: '', // 合同编号		
      orderNum: '', // 订单编号 关联订单表	
      purchaser: '', // 采购商		
      address: '',	// 收货地址		
      sendnum: '',	// 发货单号		
      sendtime: '', // 发货时间		
      supplier: '', // 供应商		
      trackingcompany: '',	// 物流公司		
      trackingnum: '',	// 物流单号		
    }
    console.log(this.state.ordernid)
  }
  render() {

    let itemlist = this.state.cargoDetailGetDataList
    
      const elements = itemlist.map((item) =>
        <li>
          <ol>
            <li style={{ width: '150px' }}><span>{item.productname}</span></li>
            <li style={{ width: '170px' }}><p>规格型号：</p><span>{item.omspecificationtype}</span></li>
            <li style={{ width: '250px' }}><p>商品编码：</p><span>{item.commoditycode}</span></li>
            <li style={{ width: '170px' }}><p>钢企编号：</p><span>{item.materialcode}</span></li>
            <li style={{ width: '170px' }}><p>最小计量单位：</p><span>{item.unit}</span></li>
            <li><p>换算后采购数量：</p><span>{item.quantityordered}</span></li>
            <li style={{ width: '150px' }}><p>未发货数量：</p><span>{item.nocargo}</span></li>
            <li><p>发货数量：</p><span>{item.sendquantity}</span></li>
          </ol>
        </li>
      )

      return (
        <div className={style.invoicebox}>
          {/* 面包屑 */}
          <Breadcrumb className='breadcrumb'>
            <Breadcrumb.Item ><Link to='/seller/deal/send'><span className='normal'>发货管理</span></Link></Breadcrumb.Item>

            <Breadcrumb.Item ><Link  to={`/seller/deal/shipments?ordernid=${this.state.ordernid}`}><span className='normal'>生成发货单</span></Link></Breadcrumb.Item>
            <Breadcrumb.Item><span className='now'>发货单</span></Breadcrumb.Item>
          </Breadcrumb>
          <div className={style.invoicecontent}>
            <PageHeader pagetitle='发货单' />
            <div className={style.essentialinformation}>
              <h3>基本信息</h3>
              <div className={style.essentialbox}><p>供应商：</p><span>{this.state.supplier}</span></div>
              <ul className={style.essentialboxes}>
                <li><p>收货地址：</p><span>{this.state.address}</span></li>
                <li><p>物流编号：</p><span>{this.state.trackingnum}</span></li>
                <li><p>物流公司：</p><span>{this.state.trackingcompany}</span></li>
                <li><p>发货时间：</p><span>{this.state.sendtime}</span></li>
              </ul>
            </div>
            <div className={style.Detailsofdelivery}>
              <div className={style.tabs}>
                <span>订单发货明细</span>
                <span><p>订单编号：</p>{this.state.ordernum}</span>
                {/* <span><p>钢企编号：</p>0103010301000120</span> */}
              </div>
              <ul className={style.everys}>
                {elements}
              </ul>
            </div>
          </div>
        </div>

      )
  }
  componentDidMount() {
    api.Examine({ nid: this.state.nid }).then(res => {
      console.log(res);
      let resData = checkJson(res);
      console.log(resData);
      this.setState({
        cargoDetailGetDataList: resData.cargoDetailGetDataList,
        contractNum: resData.contractNum, // 合同编号		
        orderNum: resData.orderNum, // 订单编号 关联订单表	
        purchaser: resData.purchaser, // 采购商		
        address: resData.address,	// 收货地址		
        sendnum: resData.sendnum,	// 发货单号		
        sendtime: resData.sendtime, // 发货时间		
        supplier: resData.supplier, // 供应商		
        trackingcompany: resData.trackingcompany,	// 物流公司		
        trackingnum: resData.trackingnum,	// 物流单号	
      });
    });
    console.log(this.props.location.state);
    
  }
  //面包屑点击 迁移到 订单详情 画面

  
  moveToDetail=()=> {
    let param = {
      pathname: `/seller/deal/shipments`,
      state: {
        ...this.props.location.state,
        nid: this.state.nid,
      }
    }
    console.log('history.push(param)=', param)
    this.props.history.push(param);
  }
}

export default GenerateInvoice;
