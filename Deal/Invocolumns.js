import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// 插件组件
import style from '@css/buyer/Implement/Invoicecanbeentered.scss';
import { checkJson, confirmF, getSearchString } from '@common/common';
import { Button, Input, Breadcrumb, Icon, Modal, Radio, message, InputNumber, Table, Row, Col, Form } from 'antd';
import PageHeader from "@com/PageHeader";
import api from '@api/methodIndex';
import { log } from 'util';

export const Invocolumns = (self) => {
  return [
      {
        title: '订单编号',
        dataIndex: 'subordernum',
        key: 'subordernum'
      },
      {
        title: '商品名称',
        dataIndex: 'productname',
        key: 'productname'
      },
      {
        title: '商品编码',
        dataIndex: 'commoditycode',
        key: 'commoditycode'
      }, {
        title: '钢企编号',
        dataIndex: 'materialcode',
        key: 'materialcode'
      },
      {
        title: '规格型号',
        dataIndex: 'omspecificationtype',
        key: 'omspecificationtype'
      },
      {
        title: '单价',
        dataIndex: 'unitprice',
        key: 'unitprice'
      }, {
        title: '订购数量',
        dataIndex: 'quantityordered',
        key: 'quantityordered'
      },
      {
        title: '单位',
        dataIndex: 'unitname',
        key: 'unitname'
      },
      {
        title: '开票数量',
        dataIndex: 'quantity',
        key: 'quantity',
    
        render: (text, record) => {
          return <Input style={{ width: 60, textAlign: 'right' }}  onChange={self.clickFn.bind(this,record,'quantity')} ></Input>
        }
      },
      {
        title: '税率',
        dataIndex: 'taxrate',
        key: 'taxrate'
      }
    
  ]
}