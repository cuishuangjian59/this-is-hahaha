import React, { Component } from 'react';
import { Form, Input, DatePicker, Button, Select } from 'antd'
import { checkJson } from '@common/common'
import api from '@api/methodIndex'

const { RangePicker } = DatePicker;

let itemlist = []
class SendFilterForm extends Component {
    getItemsValue = () => {    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const valus = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return valus;
    }
    constructor(props) {
        super(props)
        this.state = {
            fetching: false,
            params: {
                form: {
                    orderSource: 0,
                    orderStatus: 0,
                    contractStatus: 0,
                }
            },
            isShowAllData: false,

            dispaly: 'none',

        }
    }



    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div style={{ padding: '15px 0 5px 0', position: 'relative' }}>
                <Form layout="inline" className="FilterForm" >
                    <Form.Item
                        style={{ marginLeft: '15px' }}
                        label='采购商'
                    >
                        {getFieldDecorator('purchaser')(
                            <Select allowClear style={{ width: 180 }} onChange={this.handleChange} placeholder='采购商'>
                                {
                                    itemlist.map(item => <Select.Option key={item.organizationNid} value={item.organizationNid} >{item.companyName}</Select.Option>)
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        style={{ marginLeft: '15px' }}
                        label='订单号'
                    >
                        {getFieldDecorator('ordernum')(
                            <Input placeholder='订单号' style={{ width: 180 }} />
                        )}
                    </Form.Item>
                    <Form.Item
                        style={{ marginLeft: '15px' }}
                        label='合同编号'
                    >
                        {getFieldDecorator('contractnum')(
                            <Input placeholder='合同编号' style={{ width: 180 }} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="发货时间"
                        style={{ marginLeft: '15px' }}
                    >
                        {getFieldDecorator('sendtime')(
                            <RangePicker style={{ width: 320 }} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="square-btn" onClick={this.searchF.bind(this, { params: {} })} >搜索</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }



    //搜索功能
    searchF(obj) {
        if (obj) {
            this.state.params.pageNum = 1
            this.setState({
                params: this.state.params,
                current: 1
            })
        }
        let searchParams = {};
        let { params } = this.state;
        searchParams = Object.assign({}, params, this.props.form.getFieldsValue(), obj)
        console.log(searchParams)

        if (searchParams.creationtime && searchParams.creationtime.length) {
            searchParams.startTime = `${searchParams.creationtime[0].format('YYYY-MM-DD')} 00:00:00`;
            searchParams.endTime = `${searchParams.creationtime[1].format('YYYY-MM-DD')} 23:59:59`;
        } else {
            ['startTime', 'endTime'].forEach(item => delete searchParams[item])
        }
        let removeArr = ['form', 'creationtime']
        removeArr.forEach(item => delete searchParams[item])
        this.loadData(searchParams)
    }

    loadData(params) {
        console.log('params=', params);
        // this.props.showTableLoading();
        api.ShippingManagement(params).then(res => {
            let resData = checkJson(res);
            if (resData) {
                this.props.searchEnter(resData)
                this.props.setParams(params)
            }
        })
    }

    componentDidMount() {
        api.getCaiGou({}).then(res => {
            let resData = checkJson(res);
            console.log(resData);

            if (resData) {
                itemlist = resData
            }
            console.log(itemlist);

        })
    }



}
export default Form.create()(SendFilterForm);






