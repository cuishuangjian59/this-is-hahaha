import React, { Component } from 'react';
import { Col, Row, Empty } from 'antd';
import style from './deal.scss';
import { Link } from 'react-router-dom';
import api from '@api/methodIndex' //接口
import stateEnum from '@common/status' //枚举类方法 

// import { checkJson } from "@common/common";
import { getDate, getLocaleDate, getNumber } from '@common/common'
class InvoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardList,
      invoicenum: '',
    };
  }
  render() {
    var datalets = this.props.cardList
    console.log(datalets);
    if (datalets.length == 0) {
      return (
        <div className={style['iron-list-empty']} >
          <Empty description="暂无数据" className={style['empty-view']} />
        </div>
      )
    } else {
      const elements = datalets.map((item) =>
          
        <div style={{ marginBottom: '20px' }}>
          <div className={style['card-list']} >
            <Row>
              <Col span={24} >
                <Row className={style['headerRow']}>
                  <Col span={6}>{item.purchaser}</Col>
                  <Col span={7}>订单编号：<span>{item.ordernum}</span></Col>
                  <Col span={6}>合同编号：<span>{item.contractnum}</span></Col>
                  <Col span={5} style={{ paddingLeft: '30px', color: '#A1A1A1', fontSize: '12px' }}><span>{item.invoiceDate}</span></Col>
                </Row>
                <Row className={style['bodyRow']}>
                  <Col span={22} >
                    <Col span={24} >
                      <Row className={style['leftRow']} >

                        <Col span={6} style={{ lineHeight: '40px' }}><span>合同金额 :<span style={{ marginLeft: '10px' }}>{item.contractamount}</span></span></Col>
                        <Col span={6} style={{ lineHeight: '40px' }}><span>已开票金额 :<span style={{ marginLeft: '10px' }}>{item.haveticketmoney}</span></span></Col>
                        <Col span={6} style={{ lineHeight: '40px' }}><span>开票状态 :<span style={{ marginLeft: '10px' }}>{stateEnum.InvoiceStatusEnumTwo(item.invoicestatus)}</span></span></Col>
                        <Col span={6} style={{ lineHeight: '40px' }}><span>挂账状态 :<span style={{ marginLeft: '10px' }}>{stateEnum.SettleaccountStatusEnum(item.settleaccountstatus)}</span></span></Col>

                      </Row>
                    </Col>
                  </Col>
                  <Col span={2} className={style['rightRow']} >
                    <Row className={style['buttonRow']}>
                      <Col>
                        {item.invoicestatus == 1||item.invoicestatus == 0
                          ?
                          <Row style={{ lineHeight: '40px', fontWeight: 600 }}><span className="color-0078E7 cur-pointer" ><Link style={{ fontWeight: 600 }} className="color-0078E7 cur-pointer" to={`/seller/deal/invonewtwo?ordernid=${item.ordernid}`} >确认开票</Link></span></Row>                          
                          : item.invoicestatus == 2
                          ?
                          <Row style={{ lineHeight: '40px', fontWeight: 600 }}><span className="color-0078E7 cur-pointer" >
                            <div><Link style={{ fontWeight: 600 }} className="color-0078E7 cur-pointer" to={`/seller/deal/invonewtwo?ordernid=${item.ordernid}`} >确认开票</Link></div>
                            <div><Link style={{ fontWeight: 600 }} className="color-0078E7 cur-pointer" to={`/seller/deal/invodetial?ordernid=${item.ordernid}`} >查看发票</Link></div>
                          </span></Row>                          
                          :
                          <Row style={{ lineHeight: '40px', fontWeight: 600 }}><span className="color-0078E7 cur-pointer" ><Link style={{ fontWeight: 600 }} className="color-0078E7 cur-pointer" to={`/seller/deal/invodetial?ordernid=${item.ordernid}`} >查看发票</Link></span></Row>
                        }

                        
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      )

      return (
        <div>
          {elements}
        </div>
      )
    }
  };
};


export default InvoCard;
