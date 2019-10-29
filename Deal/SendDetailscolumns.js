import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 插件组件
import style from '@css/buyer/Implement/Invoicecanbeentered.scss';
import { checkJson, confirmF, getSearchString } from '@common/common';
import { Button, Input, Breadcrumb, Icon, Modal, Radio, message, InputNumber, Table, Row, Col, Form } from 'antd';
import PageHeader from "@com/PageHeader";
import api from '@api/methodIndex';
import { log } from 'util';

export let DetailsColumns =(self)=> [
  {
    title: '发货单号',
    dataIndex: 'sendnum',
    key: 'sendnum',
    width: '150px',
  },
  {
    title: '订单编号',
    dataIndex: 'ordernum',
    key: 'ordernum',
    width: '150px',
  },
  {
    title: '物流单号',
    dataIndex: 'trackingnum',
    key: 'trackingnum',
    width: '150px',
  },
  {
    title: '物流公司',
    dataIndex: 'trackingcompany',
    key: 'trackingcompany',
    width: '150px',
  },
  {
    title: '发货数量',
    dataIndex: 'sendquantity',
    key: 'sendquantity',
    width: '150px',
  },
  {
    title: '发货时间',
    dataIndex: 'sendtime',
    key: 'sendtime',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'reason',
    key: 'reason',
    width: 90,
    render: (text, record) => {
      return <span>
        <a  onClick={self.clickFn.bind(this,record.nid)} >查看</a>
      </span>
    }

  }
]
