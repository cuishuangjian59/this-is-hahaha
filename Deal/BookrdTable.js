import React from 'react';
import { Col, Row, Empty, Form, Table, Pagination, Modal } from 'antd';
import PageHeader from '@com/PageHeader'; // 页头
import BookedFilterForm from './BookedFilterForm';    // 用于搜索的表单
import { Link } from 'react-router-dom';
import style from './deal.scss'
import { checkJson } from '@common/common'
import api from '@api/methodIndex'
import stateEnum from '@common/status' //枚举类方法 



export const ProductListColumns = (self) => {
  return [

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
      width: '180px',
    },
    {
      title: '采购商',
      dataIndex: 'companyName',
      key: 'companyName',
      width: '180px',
    },
    {
      title: '支付方式',
      dataIndex: 'payway',
      key: 'payway',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return <span>{stateEnum.TradePaywayEnumTwo(record.payway)}</span>
      }
    },
    {
      title: '平台流水号',
      dataIndex: 'paymentid',
      key: 'paymentid',
      align: 'center',
      width: '150px',
    },
    {
      title: '付款金额',
      dataIndex: 'paymentmoney',
      key: 'paymentmoney',
      align: 'center',
      width: '130px',
    },
    {
      title: '状态',
      dataIndex: 'ifenter',
      key: 'ifenter',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return <span>{stateEnum.AccountingStatusEnumTwo(record.ifenter)}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'reason',
      key: 'reason',
      width: 90,
      render: (text, record) => {
        if(record.ifenter == 0){
          return <span><a onClick={self.clickbtn.bind(this,record.paymentnid,record.ordernid)} >入账</a></span>
        }else{
          return <span  style = {{color:'#ccc'}}>入账</span>

        }
       

      }

    }

  ]
}