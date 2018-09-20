import React, {Component} from 'react'
import {Form, Select, Button, Input } from 'antd'
import _ from 'lodash'
import styles from './index.less'

const FormItem = Form.Item;
const Option = Select && Select.Option

export default class WaterForm extends Component {

  render () {
    const {modalDataMap} = this.props
    const {bigSampleData, bigTestData, bigTestSystemsData} = modalDataMap
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    return (
      <Form layout="horizontal" className={styles.dataForm}>
        <div className={styles.leftForm}>
          <FormItem
            {...formItemLayout}
            label="样品名称"
          >
            <Select>
              {
                bigSampleData && bigSampleData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="试验模型名称"
          >
            <Select>
              {
                bigTestData && bigTestData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="测试系统名称"
          >
            <Select>
              {
                bigTestSystemsData && bigTestSystemsData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="压力(MPa)"
          >
            <Select>
              {
                [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="温度(T/度)"
          >
            <Select>
              {
                [0,5,10,15,20,25,30].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="频率(f/Hz)"
          >
            <Select>
              {
                ['0-5k','5-10k','10-15k','15-20k','20-25k','25-30k'].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
        </div>
        <div className={styles.centerForm}>
          <Button type="primary">计算</Button>
        </div>
        <div className={styles.rightForm}>
          <FormItem
            {...formItemLayout2}
            label="反射系数"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="透射系数"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="吸声系数"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="回声降低"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="辐射声功率"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="辐射声功率插入损失"
          >
            <Input />
          </FormItem>
        </div>
      </Form>
    )
  }
}
