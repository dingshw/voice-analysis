import React, {Component} from 'react'
import {Form, Select, Button, Input, message } from 'antd'
import _ from 'lodash'
import styles from './index.less'

const FormItem = Form.Item;
const Option = Select && Select.Option

export default class SoundForm extends Component {

  state = {
    // soundData: {
    //   samplename: null,
    //   backingname: null,
    //   press: null,
    //   rate: null,
    //   refect: null,
    //   temparture: null,
    //   transmission: null,
    //   bondacust: null,
    // },
  }

  handleChange = (type, value) => {
    const {soundData, handelSoundData} = this.props
    // if(value.target && type!=='rate') {
    //   if(value.target.value<0 || value.target.value>1) {
    //     message.error('请输入0-1之间的值')
    //     return
    //   }
    // }
    const valueTemp = value.target ? value.target.value : value
    // if(type === 'rate') {
    //   const {modalDataMap} = this.props
    //   const {soundPipeData} = modalDataMap
    //   const {data} = soundPipeData
    //   for(const item of data) {
    //     if(item.rate == valueTemp) {
    //       soundData.refect = item.refect
    //       soundData.transmission = item.transmission
    //       soundData.bondacust = item.bondacust
    //     }
    //   }
    // }
    soundData[type] = valueTemp
    // this.setState({soundData})
    handelSoundData(soundData)
  }

  checkIsTrue = (value) => {
    return value !== undefined && value !== null
  }

  checkCanComputer = () => {
    const {soundData} = this.props
    if(this.checkIsTrue(soundData.samplename) && this.checkIsTrue(soundData.backingname)
      && this.checkIsTrue(soundData.temparture) && this.checkIsTrue(soundData.press)
      && this.checkIsTrue(soundData.rateRange)) {
      return true
    }
    return false
  }

  handelComputeSoundeData = () => {
    const {handelCompute, soundData} = this.props
    /* {
        "samplename":"阿波罗",
        "backingname":"30mm",
        "temparture":"15",
        "press":"1",
        "rateMin":"2",
        "rateMax":"100"

      } */
    const rateRange = soundData && soundData.rateRange
    const rateMin = rateRange.substring(0, rateRange.indexOf('-'))
    const rateMax = rateRange.substring(rateRange.indexOf('-')+1, rateRange.indexOf('k'))
    const dataMap = {
      samplename: soundData.samplename,
      backingname:soundData.backingname,
      temparture: Number(soundData.temparture) || 0,
      press: Number(soundData.press) || 0,
      rateMin: Number(rateMin)* 1000,
      rateMax: Number(rateMax)* 1000,
    }
    handelCompute(dataMap)
  }

  render () {
    const {modalDataMap, soundData} = this.props
    const {soundPipeData} = modalDataMap
    const {data} = soundPipeData
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Form layout="horizontal" className={styles.dataForm}>
        <div className={styles.leftForm}>
          <FormItem
            {...formItemLayout}
            label="元数据名称"
          >
            <Input value={soundData.name} disabled />
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
            <Input value={soundData.samplename} disabled />
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
            label="背衬名称"
          >
            <Input value={soundData.backingname} disabled />
            {/* <Select
              value={soundData.backingname}
              onChange={this.handleChange.bind(this, 'backingname')}
            >
              {
                backingData && backingData.map(item => {
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
            <Input value={soundData.press} disabled />
            {/* <Select
              value={soundData.press}
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
            <Input value={soundData.temparture} disabled />
            {/* <Select
              value={soundData.temparture}
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
              value={soundData.rateRange}
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
            {...formItemLayout}
            label="频率(f/Hz)"
          >
            <Input value={soundData.rate} onChange={this.handleChange.bind(this, 'rate')} />
            {/* <Select
              value={soundData.rate}
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
            {...formItemLayout}
            label="反射系数"
          >
            <Input value={soundData.refect} onChange={this.handleChange.bind(this, 'refect')} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="透射系数"
          >
            <Input value={soundData.transmission} onChange={this.handleChange.bind(this, 'transmission')} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="吸声系数"
          >
            <Input value={soundData.bondacust} onChange={this.handleChange.bind(this, 'bondacust')} />
          </FormItem>
        </div>
      </Form>
    )
  }
}
