import React, {Component} from 'react'
import {Form, Select, Button, Input } from 'antd'
import _ from 'lodash'
import styles from './index.less'

const FormItem = Form.Item;
const Option = Select && Select.Option

export default class ScaleForm extends Component {

  render () {
    const {modalDataMap} = this.props
    const {testModel, layingSchemes, testConditions} = modalDataMap
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8},
      },
    };
    return (
      <Form layout="horizontal" className={styles.dataForm}>
        <div className={styles.leftForm}>
          <FormItem
            {...formItemLayout}
            label="试验模型名称"
          >
            <Select>
              {
                testModel && testModel.map(item => {
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
            label="试验情况名称"
          >
            <Select>
              {
                testConditions && testConditions.map(item => {
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
            label="敷设方案名称"
          >
            <Select>
              {
                layingSchemes && layingSchemes.map(item => {
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
            label="光壳声目标强度"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="光壳辐射声功率"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="敷瓦声目标强度"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="敷瓦辐射声功率"
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="声目标强度降低量"
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
