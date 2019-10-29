// 发货详情     cui



import React, { Component } from 'react';
import { Table, Breadcrumb, Button, Icon, message, Spin, Divider } from 'antd';
import { Link } from 'react-router-dom'
import PageHeader from '@com/PageHeader'; // 页头
import api from '@api/methodIndex'
import { checkJson, getSearchString } from '@common/common'
import {DetailsColumns} from './SendDetailscolumns'


class SendDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      ordernum: getSearchString(window.location.search, 'ordernum')
    }
  }
  render() {
    return (
      <div >
        {/* 面包屑 */}
        <Breadcrumb className='breadcrumb' style={{ paddingTop: '20px', background: 'rgb(234 237 241)' }}>
          <Breadcrumb.Item ><Link to='/seller/deal/send'><span className='normal'>发货管理</span></Link></Breadcrumb.Item>
          <Breadcrumb.Item><span className='now'>查看明细</span></Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: '20px' }}>
          <PageHeader pagetitle='发货管理'></PageHeader>

          <Table columns={DetailsColumns(this)} dataSource={this.state.cardList} pagination={false} style={{ marginTop: '20px' }} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadData()
  }
  loadData() {
    api.DeliveryDetails({ ordernum: this.state.ordernum }).then(res => {
      let resData = checkJson(res);
      if (resData) {
        this.setState({
          cardList: resData.cargoDatas,
        })
      }
    })
  }
  clickFn = (nid) => {
    let param = {
      pathname: `/seller/deal/TwoGenerateInvoice`,
      state: {
        ...this.props.location.state,
        nid:nid,
        ordernum: this.state.ordernum,
      }
    }
    console.log(param.state.ordernum);


    this.props.history.push(param);
  }
}

export default SendDetails;