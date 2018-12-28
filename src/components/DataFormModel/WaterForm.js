import React, {Component} from 'react'
import {Form, Select, Button, Input, message } from 'antd'
import _ from 'lodash'
import styles from './index.less'

const FormItem = Form.Item;
const Option = Select && Select.Option

export default class WaterForm extends Component {

  handleChange = (type, value) => {
    const {waterdData, handelWaterData} = this.props
    // if(value.target) {
    //   if(value.target.value<0 || value.target.value>1) {
    //     message.error('请输入0-1之间的值')
    //     return
    //   }
    // }
    const valueTemp = value.target ? value.target.value : value
    // if(type === 'rate') {
    //   const {modalDataMap} = this.props
    //   const {waterpotData} = modalDataMap
    //   const {data} = waterpotData
    //   for(const item of data) {
    //     if(item.rate == valueTemp) {
    //       waterdData.refect = item.refect
    //       waterdData.transmission = item.transmission
    //       waterdData.bondacust = item.bondacust
    //       waterdData.radiation = item.radiation
    //       waterdData.radiationlose = item.radiationlose
    //       waterdData.echoes = item.echoes
    //     }
    //   }
    // }
    waterdData[type] = valueTemp
    // this.setState({soundData})
    handelWaterData(waterdData)
  }

  checkIsTrue = (value) => {
    return value !== undefined && value !== null
  }

  checkCanComputer = () => {
    const {waterdData} = this.props
    if(this.checkIsTrue(waterdData.sampleName) && this.checkIsTrue(waterdData.testModelName)
      && this.checkIsTrue(waterdData.testSystemName)
      && this.checkIsTrue(waterdData.temparture) && this.checkIsTrue(waterdData.press)
      && this.checkIsTrue(waterdData.rateRange)) {
      return true
    }
    return false
  }

  handelComputeSoundeData = () => {
    const {handelCompute, waterdData} = this.props
    /* {
        "samplename":"阿波罗",
        "backingname":"30mm",
        "temparture":"15",
        "press":"1",
        "rateMin":"2",
        "rateMax":"100"

      } */
    const rateRange = waterdData && waterdData.rateRange
    const rateMin = rateRange.substring(0, rateRange.indexOf('-'))
    const rateMax = rateRange.substring(rateRange.indexOf('-')+1, rateRange.indexOf('k'))
    const dataMap = {
      sampleName: waterdData.sampleName,
      testModelName:waterdData.testModelName,
      testSystemName:waterdData.testSystemName,
      temparture: Number(waterdData.temparture) || 0,
      press: Number(waterdData.press) || 0,
      rateMin: Number(rateMin)* 1000,
      rateMax: Number(rateMax)* 1000,
    }
    handelCompute(dataMap)
  }

  render () {
    const {modalDataMap, waterdData} = this.props
    const {waterpotData} = modalDataMap
    const {data} = waterpotData
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 11 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    return (
      <Form layout="horizontal" className={styles.dataForm}>
        <div className={styles.leftForm}>
          <FormItem
            {...formItemLayout}
            label="元数据名称"
          >
            <Input value={waterdData.name} disabled />
            {/* <Select
              value={soundData.samplename}
              onChange={this.handleChange.bind(this, 'samplename')}
            >
              {
                sampleData && sampleData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="样品名称"
          >
            <Input value={waterdData.sampleName} disabled />
            {/* <Select
              value={waterdData.sampleName}
              onChange={this.handleChange.bind(this, 'sampleName')}
            >
              {
                bigSampleData && bigSampleData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="试验模型名称"
          >
            <Input value={waterdData.testModelName} disabled />
            {/* <Select
              value={waterdData.testModelName}
              onChange={this.handleChange.bind(this, 'testModelName')}
            >
              {
                bigTestData && bigTestData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="测试系统名称"
          >
            <Input value={waterdData.testSystemName} disabled />
            {/* <Select
              value={waterdData.testSystemName}
              onChange={this.handleChange.bind(this, 'testSystemName')}
            >
              {
                bigTestSystemsData && bigTestSystemsData.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="压力(MPa)"
          >
            <Input value={waterdData.press} disabled />
            {/* <Select
              value={waterdData.press}
              onChange={this.handleChange.bind(this, 'press')}
            >
              {
                [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="温度(T/度)"
          >
            <Input value={waterdData.temparture} disabled />
            {/* <Select
              value={waterdData.temparture}
              onChange={this.handleChange.bind(this, 'temparture')}
            >
              {
                [0,5,10,15,20,25,30].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          {/* <FormItem
            {...formItemLayout}
            label="频率范围"
          >
            <Select
              value={waterdData.rateRange}
              onChange={this.handleChange.bind(this, 'rateRange')}
            >
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
          </FormItem> */}
        </div>
        {/* <div className={styles.centerForm}>
          <Button
            type="primary"
            onClick={this.handelComputeSoundeData}
            disabled={!this.checkCanComputer()}
          >
            计算
          </Button>
        </div> */}
        <div className={styles.rightForm}>
          <FormItem
            {...formItemLayout2}
            label="频率(f/Hz)"
          >
            <Input value={waterdData.rate} onChange={this.handleChange.bind(this, 'rate')} />
            {/* <Select
              value={waterdData.rate}
              onChange={this.handleChange.bind(this, 'rate')}
            >
              {
                data && data.map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.rate}>{item.rate}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select> */}
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="反射系数"
          >
            <Input value={waterdData.refect} onChange={this.handleChange.bind(this, 'refect')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="透射系数"
          >
            <Input value={waterdData.transmission} onChange={this.handleChange.bind(this, 'transmission')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="吸声系数"
          >
            <Input value={waterdData.bondacust} onChange={this.handleChange.bind(this, 'bondacust')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="回声降低"
          >
            <Input value={waterdData.echoes} onChange={this.handleChange.bind(this, 'echoes')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="辐射声功率"
          >
            <Input value={waterdData.radiation} onChange={this.handleChange.bind(this, 'radiation')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="辐射声功率插入损失"
          >
            <Input value={waterdData.radiationlose} onChange={this.handleChange.bind(this, 'radiationlose')} />
          </FormItem>
        </div>
      </Form>
    )
  }
}
