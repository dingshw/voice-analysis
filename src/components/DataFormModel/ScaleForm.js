import React, {Component} from 'react'
import {Form, Select, Button, Input, message } from 'antd'
import _ from 'lodash'
import styles from './ScaleForm.less'

const FormItem = Form.Item;
const Option = Select && Select.Option

export default class ScaleForm extends Component {

  handleChange = (type, value) => {
    const {scaleData, handelScaleData} = this.props
    // if(value.target) {
    //   if(value.target.value<0 || value.target.value>1) {
    //     message.error('请输入0-1之间的值')
    //     return
    //   }
    // }
    const valueTemp = value.target ? value.target.value : value
    // if(type === 'rate') {
    //   const {modalDataMap} = this.props
    //   const {scaleCondition} = modalDataMap
    //   const {data} = scaleCondition
    //   for(const item of data) {
    //     if(item.rate == valueTemp) {
    //       scaleData.lightShellTS = item.lightShellTS
    //       scaleData.lightShellSP = item.lightShellSP
    //       scaleData.layingShellTS = item.layingShellTS
    //       scaleData.layingShellSP = item.layingShellSP
    //       scaleData.reductionTS = item.reductionTS
    //       scaleData.reductionSP = item.reductionSP
    //     }
    //   }
    // }
    scaleData[type] = valueTemp
    // this.setState({soundData})
    handelScaleData(scaleData)
  }

  checkIsTrue = (value) => {
    return value !== undefined && value !== null
  }

  checkCanComputer = () => {
    const {scaleData} = this.props
    if(this.checkIsTrue(scaleData.testModelObjName) && this.checkIsTrue(scaleData.testConditionName)
      && this.checkIsTrue(scaleData.layingSchemeName) && this.checkIsTrue(scaleData.rateRange)) {
      return true
    }
    return false
  }

  handelComputeSoundeData = () => {
    const {handelCompute, scaleData} = this.props
    const rateRange = scaleData && scaleData.rateRange
    const rateMin = rateRange.substring(0, rateRange.indexOf('-'))
    const rateMax = rateRange.substring(rateRange.indexOf('-')+1, rateRange.indexOf('k'))
    const dataMap = {
      testModelObjName: scaleData.testModelObjName,
      testConditionName:scaleData.testConditionName,
      layingSchemeName:scaleData.layingSchemeName,
      rateMin: Number(rateMin)* 1000,
      rateMax: Number(rateMax)* 1000,
    }
    handelCompute(dataMap)
  }

  render () {
    const {modalDataMap, scaleData} = this.props
    const {scaleCondition} = modalDataMap
    const {data} = scaleCondition
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
            label="元数据名称"
          >
            <Input value={scaleData.name} disabled />
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
            label="试验模型名称"
          >
            <Input value={scaleData.testModelObjName} disabled />
            {/* <Select
              value={scaleData.testModelObjName}
              onChange={this.handleChange.bind(this, 'testModelObjName')}
            >
              {
                testModel && testModel.map(item => {
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
            label="试验情况名称"
          >
            <Input value={scaleData.testConditionName} disabled />
            {/* <Select
              value={scaleData.testConditionName}
              onChange={this.handleChange.bind(this, 'testConditionName')}
            >
              {
                testConditions && testConditions.map(item => {
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
            label="敷设方案名称"
          >
            <Input value={scaleData.layingSchemeName} disabled />
            {/* <Select
              value={scaleData.layingSchemeName}
              onChange={this.handleChange.bind(this, 'layingSchemeName')}
            >
              {
                layingSchemes && layingSchemes.map(item => {
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
              value={scaleData.rateRange}
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
            <Input value={scaleData.rate} onChange={this.handleChange.bind(this, 'rate')} />
            {/* <Select
              value={scaleData.rate}
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
            label="光壳声目标强度"
          >
            <Input value={scaleData.lightShellTS} onChange={this.handleChange.bind(this, 'lightShellTS')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="光壳辐射声功率"
          >
            <Input value={scaleData.lightShellSP} onChange={this.handleChange.bind(this, 'lightShellSP')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="敷瓦声目标强度"
          >
            <Input value={scaleData.layingShellTS} onChange={this.handleChange.bind(this, 'layingShellTS')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="敷瓦辐射声功率"
          >
            <Input value={scaleData.layingShellSP} onChange={this.handleChange.bind(this, 'layingShellSP')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="声目标强度降低量"
          >
            <Input value={scaleData.reductionTS} onChange={this.handleChange.bind(this, 'reductionTS')} />
          </FormItem>
          <FormItem
            {...formItemLayout2}
            label="辐射声功率插入损失"
          >
            <Input value={scaleData.reductionSP} onChange={this.handleChange.bind(this, 'reductionSP')} />
          </FormItem>
        </div>
      </Form>
    )
  }
}
