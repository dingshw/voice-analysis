import React, {Component} from 'react'
import _ from 'lodash'
import { Steps, Button, message } from 'antd';
import MetaContent from './MetaContent'
import RateRangeContent from './RateRangeContent'

const Step = Steps && Steps.Step;

const soundColumns = {
  name: '元数据名称',
  samplename: '样品名称',
  backingname: '背衬名称',
  press: '压力',
  temparture: '温度',
}

const waterColumns = {
  name: '元数据名称',
  sampleName: '样品名称',
  testModelName: '试验模型名称',
  testSystemName: '测试系统名称',
  press: '压力',
  temparture: '温度',
}

const scaleColumns = {
  name: '元数据名称',
  testModelObjName: '试验模型名称',
  testConditionName: '试验情况名称',
  layingSchemeName: '敷设方案名称',
}

export default class StepModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      selectColData: null,
      soundData: {
        name: null,
        smallPO: null,
        samplename: null,
        backingname: null,
        press: null,
        rate: null,
        refect: null,
        temparture: null,
        transmission: null,
        bondacust: null,
      },
      waterdData: {
        name: null,
        bigDemoMetadata: null,
        sampleName: null,
        testModelName:null,
        testSystemName:null,
        temparture:null,
        press:null,
        refect: null,
        transmission: null,
        bondacust: null,
        rate: null,
        radiation: null,
        radiationlose: null,
        echoes: null,
      },
      scaleData: {
        name: null,
        scaleMataPO: null,
        testModelObjName: null,
        layingSchemeName:null,
        testConditionName:null,
        rate: null,
        lightShellTS: null,
        lightShellSP: null,
        layingShellTS: null,
        layingShellSP: null,
        reductionTS: null,
        reductionSP: null,
      },
    };
  }

  onChange = (changeData) => {
    this.setState({selectColData: {...changeData}})
  }

  mergeData = (type, selectColData) => {
    const {soundData, waterdData, scaleData} = this.state
    let formData = {}
    if(type === 'isSound') {
      formData = _.cloneDeep(soundData)
      formData.smallPO = {pk: selectColData.pk}
    } else if(type === 'isScale'){
      formData = _.cloneDeep(scaleData)
      formData.scaleMataPO = {pk: selectColData.pk}
    } else if(type === 'isWater'){
      formData = _.cloneDeep(waterdData)
      formData.bigDemoMetadata = {pk: selectColData.pk}
    }
    Object.keys(formData).forEach(key => {
      if(selectColData[key]) {
        formData[key] = selectColData[key]
      }
    })
    return formData
  }

  handelData = (datamap) => {
    const {type} = this.props
    if(type === 'isSound') {
      this.setState({soundData: datamap})
    } else if(type === 'isScale'){
      this.setState({scaleData: datamap})
    } else if(type === 'isWater'){
      this.setState({waterdData: datamap})
    }
  }

  next = () => {
    const {current, selectColData} = this.state;
    if(selectColData===null) {
      message.error('请选择元数据', [0.01])
      return ;
    }
    this.setState({ current : current + 1 });
  }

  handelAdd = () => {
    const {handleOk, type} = this.props
    const {soundData, scaleData, waterdData} = this.state
    if(type === 'isSound') {
      handleOk(soundData)
    } else if(type === 'isScale'){
      handleOk(scaleData)
    } else if(type === 'isWater'){
      handleOk(waterdData)
    }
  }

  initColumns = (type) => {
    let columns = {}
    if(type === 'isSound') {
      columns = soundColumns
    } else if(type === 'isScale'){
      columns = scaleColumns
    } else if(type === 'isWater'){
      columns = waterColumns
    }
    return columns
  }

  prev() {
    const {current} = this.state;
    this.setState({ current : current - 1 });
  }

  render() {
    const { current, selectColData } = this.state;
    const {type, metaData} = this.props
    const formData = selectColData && this.mergeData(type, selectColData)
    const columns = this.initColumns(type)
    const steps = [{
      title: '选择元数据',
      content: (<MetaContent columns={columns} data={metaData} onChange={this.onChange} selectedRowKeys={selectColData && [selectColData.key]} />),
    }, {
      title: '选择频率范围',
      content: <RateRangeContent formData={formData} {...this.props} handelData={this.handelData} />,
    }];

    return (
      <div style={{width: '100%'}}>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => this.handelAdd()}>完成</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}
