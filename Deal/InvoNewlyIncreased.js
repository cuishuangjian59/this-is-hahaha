//发票信息(可录入)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 插件组件
import style from '@css/buyer/Implement/Invoicecanbeentered.scss';
import { checkJson, confirmF, getSearchString } from '@common/common';
import { Button, Input, Breadcrumb, Icon, Modal, Radio, message, InputNumber, Table, Row, Col, Form,DatePicker } from 'antd';
import PageHeader from "@com/PageHeader";
import api from '@api/methodIndex';
import { log } from 'util';
import { Invocolumns } from './Invocolumns'
import rules from '@common/rules';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class Invoicecanbeentered extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invoiceNid: this.props.location.state.invoiceNid, //方案id
      ordernid:this.props.location.state.ordernid,
      data: [],

      productName: '', // 商品名称
      commodityCode: '', // 商品编码
      quantity: '',  //开票数量

      contractnum: '', //合同编号
      purchaser: '', //采购商名称
      ordernum: '', // 订单编号
      subordernum: '',
      invoicedate:[]

    }
    console.log(this.props);
    console.log(this.props.location.state.invoiceNid);
    console.log(this.state.ordernid);


  }

  render() {
    console.log(this.state.data)
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={style.Invoicecanbeenbox}>
        {/* 面包屑 */}
        <Breadcrumb className='breadcrumb'>
          <Breadcrumb.Item ><Link to='/seller/deal/invo'><span className='normal'>发票管理</span></Link></Breadcrumb.Item>
          <Breadcrumb.Item ><Link to={`/seller/deal/invodetial?ordernid=${this.state.ordernid}`}><span className='normal'>订单详情</span></Link></Breadcrumb.Item>
          <Breadcrumb.Item><span className='now'>发票详情</span></Breadcrumb.Item>
        </Breadcrumb>
        <div className={style.Invoicecanbeencontent}>
          <PageHeader pagetitle='发票详情' />
          <div className={style.Invoiceinformation}>
            <Row style={{ marginTop: '20px' }}>
              <Col span={6} style={{ fontSize: '12px', marginLeft: '15px' }} ><span>合同编号</span><span style={{ marginLeft: '20px' }}>{this.state.contractnum}</span></Col>
              <Col span={6} offset={1} style={{ fontSize: '12px' }} ><span>采购商</span><span style={{ marginLeft: '20px' }}>{this.state.purchaser}</span></Col>

              <Form layout="inline" className="FilterForm" >
                <Form.Item
                  style={{ marginLeft: '25px' }}
                  label='发票抬头：'
                >
                  {getFieldDecorator('invoicehead', { ...rules.lengthValidate(20, true) })(
                    (<Input placeholder='发票抬头' style={{ width: 220 }} />)
                  )}
                </Form.Item>
                <Form.Item
                  style={{ marginLeft: '15px' }}
                  label='发票代码：'
                >
                  {getFieldDecorator('invoicenum', { ...rules.lengthValidate(20, true) })(
                    (<Input placeholder='发票代码' style={{ width: 220 }} />)
                  )}
                </Form.Item>
                <Form.Item
                  style={{ marginLeft: '25px' }}
                  label='发票日期：'
                >
                  {getFieldDecorator('invoicedate', { ...rules.requireValidate })(
                    (<DatePicker format={dateFormat} onBlur={this.onChangeInput.bind(this, 'storageDate')} />)
                  )}
                </Form.Item>
                <Form.Item
                  style={{ marginLeft: '32px' }}
                  label='未税金额（元）：'
                >
                  {getFieldDecorator('untax', { ...rules.lengthValidate(20, true) })(
                    (<Input placeholder='未税金额' style={{ width: 220 }} />)
                  )}
                </Form.Item>
                <Form.Item
                  style={{ marginLeft: '15px' }}
                  label='含税金额（元）：'
                >
                  {getFieldDecorator('tax', { ...rules.lengthValidate(20, true) })(
                   ( <Input placeholder='含税金额' style={{ width: 185 }} />)
                  )}
                </Form.Item>
              </Form>
            </Row>
            <div className={style.Listofcommodities}>
              <h3>商品清单</h3>
              <Table
                columns={Invocolumns(this)}
                dataSource={this.state.data}
                size="middle"
                pagination={false}
              />
            </div>
          </div>
        </div>
        <div className={style.btnbox}>
          <Button type="primary" onClick={this.Submission}>提交</Button>
          <Button onClick={this.Printing} >打印</Button>
        </div>
      </div>

    )
  }
  // 开票数量
  Logisticsnumber = (e) => {
    this.state.quantity = e.target.value;
  }

  componentDidMount() {
    // 获取详细数据
    api.NewInvoice({ ordernid: this.state.invoiceNid}).then(res => {
      console.log(res)
      let resData = checkJson(res);
      if (resData) {
        this.setState({
          data: resData.invoiceOrderDataList,
          contractnum: resData.contractnum,
          purchaser: resData.purchaser,
          subordernum: resData.ordernum

        })
      }
    })
  }

  //table  里面input
  clickFn = (row, skey, e) => {
    console.log(e.target.value);
    let value = e.target.value;
    row[skey] = value;
    this.setState({

    })
  }
  //头部input值保存
  onChangeInput(skey, event) {
    let value = event.target.value;
    let invoicedate = this.state.invoicedate;
    invoicedate[skey] = value;
    this.setState({
    });
  }

  // 提交
  Submission = () => {
    let searchParams = {};
    let parms = {
      contractnum: this.state.contractnum,
      purchaser: this.state.purchaser,
      subordernum: this.state.subordernum,
      invoiceDetailModelList: this.state.data
    };
    searchParams = Object.assign({}, parms, this.props.form.getFieldsValue())
    console.log(searchParams)
    api.Invoicepresent(searchParams).then(res => {
      let resData = checkJson(res);
      if (resData) {
        message.success('提交成功')
        alert(998)
        this.props.history.push(`/seller/deal/invo`)
      }else{
        message.error('提交失败')
      }
      

    })
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


export default Form.create()(Invoicecanbeentered);
