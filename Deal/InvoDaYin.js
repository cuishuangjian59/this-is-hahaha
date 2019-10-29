//打印发货单
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 插件组件
import { Button, Input, Breadcrumb, Icon, Modal, Radio, message, InputNumber, Popover } from 'antd';
import style from '@css/buyer/Implement/Invoice.scss'
import PageHeader from "@com/PageHeader";

// const content = (
//     <div>
//         <img src="https://fanyi.bdstatic.com/static/translation/img/header/logo_40c4f13.svg" alt="" style={{width:'100px'}}/>
//     </div>
//   );

class Printtheinvoice extends Component {
  constructor(props) {
    super(props);
    let locationData = this.props.location.state;
    this.state = {
      // orderNid: locationData.orderNid
    }
    console.log(this.state.orderNid);
  }
  render() {
    return (
      <div className={style.invoicebox}>
        {/* 面包屑 */}
        <Breadcrumb className='breadcrumb'>
          <Breadcrumb.Item ><Link to='/seller/deal/invo'><span className='normal'>发票管理</span></Link></Breadcrumb.Item>

          {/* <Breadcrumb.Item ><Link  onClick={this.moveToDetail.bind(this)} to={`/seller/deal/shipments`}><span className='normal'>生成发货单</span></Link></Breadcrumb.Item> */}
          <Breadcrumb.Item><span className='now'>打印发货单</span></Breadcrumb.Item>
        </Breadcrumb>
        <div className={style.invoicecontent}>
          <PageHeader pagetitle='发货单' />
          {/* <div className={style.QRcode}>
                    <Popover content={content}  placement="bottom"><Icon type="qrcode" /></Popover>
                    </div> */}
          <div className={style.essentialinformation}>
            <h3>基本信息</h3>
            <div className={style.essentialbox}><p>供应商：</p><span>北京钢铁贸易公司</span></div>
            <ul className={style.essentialboxes}>
              <li><p>收货地址：</p><span>天津市北辰区</span></li>
              <li><p>物流编号：</p><span>W343242</span></li>
              <li><p>物流公司：</p><span>德邦物流</span></li>
              <li><p>发货时间：</p><span>2019-02-01 11:11:11</span></li>
            </ul>
          </div>
          <div className={style.Detailsofdelivery}>
            <div className={style.tabs}>
              <span>A10001订单发货明细</span>
              <span><p>订单编号：</p>0103010201000120</span>
              <span><p>钢企编号：</p>0103010301000120</span>
            </div>
            {/* <div className={style.tabsQRcode}>
                            <Popover content={content}  placement="bottomRight"><Icon type="qrcode" /></Popover>
                        </div> */}
            <ul className={style.everys}>
              <li>
                <ol>
                  <li><p>商品名称：</p><span>螺栓螺栓螺栓螺栓螺栓螺栓</span></li>
                  <li><p>规格型号：</p><span>M6M6M6M6M6M6M6</span></li>
                  <li><p>商品编码：</p><span>0103010301000120</span></li>
                  <li><p>最小计量单位：</p><span>个</span></li>
                  <li><p>换算后采购数量：</p><span>10</span></li>
                  <li><p>未发货数量：</p><span>5</span></li>
                  <li><p>收货数量：</p><span>3</span></li>
                </ol>
              </li>
              <li>
                <ol>
                  <li><p>商品名称：</p><span>螺栓螺栓螺栓螺栓螺栓螺栓</span></li>
                  <li><p>规格型号：</p><span>M6M6M6M6M6M6M6</span></li>
                  <li><p>商品编码：</p><span>0103010301000120</span></li>
                  <li><p>最小计量单位：</p><span>个</span></li>
                  <li><p>换算后采购数量：</p><span>10</span></li>
                  <li><p>未发货数量：</p><span>5</span></li>
                  <li><p>收货数量：</p><span>3</span></li>
                </ol>
              </li>
              <li>
                <ol>
                  <li><p>商品名称：</p><span>螺栓螺栓螺栓螺栓螺栓螺栓</span></li>
                  <li><p>规格型号：</p><span>M6M6M6M6M6M6M6</span></li>
                  <li><p>商品编码：</p><span>0103010301000120</span></li>
                  <li><p>最小计量单位：</p><span>个</span></li>
                  <li><p>换算后采购数量：</p><span>10</span></li>
                  <li><p>未发货数量：</p><span>5</span></li>
                  <li><p>收货数量：</p><span>3</span></li>
                </ol>
              </li>
            </ul>
          </div>
          <div className={style.Detailsofdelivery}>
            <div className={style.tabs}>
              <span>A10001订单发货明细</span>
              <span><p>订单编号：</p>0103010201000120</span>
              <span><p>钢企编号：</p>0103010301000120</span>
            </div>
            {/* <div className={style.tabsQRcode}>
                            <Popover content={content}  placement="bottomRight"><Icon type="qrcode" /></Popover>
                        </div> */}
            <ul className={style.everys}>
              <li>
                <ol>
                  <li><p>商品名称：</p><span>螺栓螺栓螺栓螺栓螺栓螺栓</span></li>
                  <li><p>规格型号：</p><span>M6M6M6M6M6M6M6</span></li>
                  <li><p>商品编码：</p><span>0103010301000120</span></li>
                  <li><p>最小计量单位：</p><span>个</span></li>
                  <li><p>换算后采购数量：</p><span>10</span></li>
                  <li><p>未发货数量：</p><span>5</span></li>
                  <li><p>收货数量：</p><span>3</span></li>
                </ol>
              </li>
              <li>
                <ol>
                  <li><p>商品名称：</p><span>螺栓螺栓螺栓螺栓螺栓螺栓</span></li>
                  <li><p>规格型号：</p><span>M6M6M6M6M6M6M6</span></li>
                  <li><p>商品编码：</p><span>0103010301000120</span></li>
                  <li><p>最小计量单位：</p><span>个</span></li>
                  <li><p>换算后采购数量：</p><span>10</span></li>
                  <li><p>未发货数量：</p><span>5</span></li>
                  <li><p>收货数量：</p><span>3</span></li>
                </ol>
              </li>
              <li>
                <ol>
                  <li><p>商品名称：</p><span>螺栓螺栓螺栓螺栓螺栓螺栓</span></li>
                  <li><p>规格型号：</p><span>M6M6M6M6M6M6M6</span></li>
                  <li><p>商品编码：</p><span>0103010301000120</span></li>
                  <li><p>最小计量单位：</p><span>个</span></li>
                  <li><p>换算后采购数量：</p><span>10</span></li>
                  <li><p>未发货数量：</p><span>5</span></li>
                  <li><p>收货数量：</p><span>3</span></li>
                </ol>
              </li>
            </ul>
          </div>
          {/* <div className={style.btnbox}>
                        <Button type="primary" style={{'border-radius':'0'}} onClick={this.returnBtn}>返回</Button>
                    </div> */}
        </div>
      </div>

    )
  }
  returnBtn = () => {
    let param = {
      pathname: `/seller/orders/list/details/Productioninvoice`,
      state: this.props.location.state
    }
    console.log('history.push(param)=', param)
    this.props.history.push(param);
    // this.props.history.push('/seller/orders/list/details/Productioninvoice');
  }
  //面包屑点击 迁移到 订单详情 画面
  moveToDetail() {
    let param = {
      pathname: `/buyer/orders/list/details`,
      state: this.props.location.state
    }
    console.log('history.push(param)=', param)
    this.props.history.push(param);
  }
}

export default Printtheinvoice;
