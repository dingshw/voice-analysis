import React, { Component } from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash'
import { connect } from 'dva';
import SampleCard from 'components/CardModel/SampleCard'
import WaterParamAnalysis from 'components/CardModel/WaterParamAnalysis'
import InnerExperimentCard from 'components/CardModel/InnerExperimentCard'
import TestSystem from 'components/CardModel/TestSystem'
import UploadFile from '../UploadFile'
import ReduceReport from '../ReduceReport'
import styles from '../index.less';
import excel from '../../../../public/SamoleData.xlsx'

const Option = Select && Select.Option;
@connect(({ waterpot }) => ({
  bigSampleData: waterpot.bigSampleData,
  bigTestData: waterpot.bigTestData,
  bigTestSystemsData: waterpot.bigTestSystemsData,
  waterpotData: waterpot.waterpotData,
}))
export default class SoundPipe extends Component {

  state = {
    selectBigSampleData: {},
    selectTestData: {},
    selectBigTestSystemsData: {},
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/getBigSampleData',
    });
    dispatch({
      type: 'waterpot/getBigTestData',
    });
    dispatch({
      type: 'waterpot/getBigTestSystemsData',
    });
  }

  handleSampleChange = (value) => {
    const { bigSampleData } = this.props
    for(const i in bigSampleData) {
      if (bigSampleData[i] && bigSampleData[i].name === value) {
        this.setState({selectBigSampleData: bigSampleData[i]})
      }
    }
  }

  handleExperimentChange = (value) => {
    const { bigTestData } = this.props
    for(const i in bigTestData) {
      if (bigTestData[i] && bigTestData[i].name === value) {
        this.setState({selectTestData: bigTestData[i]})
      }
    }
  }

  handleTestSystemChange = (value) => {
    const { bigTestSystemsData } = this.props
    for(const i in bigTestSystemsData) {
      if (bigTestSystemsData[i] && bigTestSystemsData[i].name === value) {
        this.setState({selectBigTestSystemsData: bigTestSystemsData[i]})
      }
    }
  }

  handleWaterPotData = (dataMap) => {
    if(dataMap) {
      /* {
        "sampleName":"阿波罗",
        "testModelName":"双层局域实尺度试验模型",
        "testSystemName":"测试系统名称",
        "temparture":"15",
        "press":"1",	//压力
        "rateMin":"10",//频率最小值
        "rateMax":"20"//频率最大值

      } */
      const { dispatch } = this.props;
      dispatch({
        type: 'waterpot/getWaterpotDataData',
        payload: {
          ...dataMap,
        },
      });
    }
  }

  dataDownLoad = () => {
    const {waterpotData} = this.props
    const {dataParam} = waterpotData
    let url = `${window.location.host}/excelUpload/downloadBig`
    if (dataParam) {
      const paramsArray = [];
      // 拼接参数
      Object.keys(dataParam).forEach(key => paramsArray.push(`${key  }=${  dataParam[key]}`))
      if (url.search(/\?/) === -1) {
          url += `?${  paramsArray.join('&')}`
      } else {
          url += `&${  paramsArray.join('&')}`
      }
    }
    window.open(url, "_blank");
  }

  render() {
    const { selectBigSampleData, selectTestData, selectBigTestSystemsData } = this.state
    const { bigSampleData, bigTestData, bigTestSystemsData, waterpotData } = this.props
    const {dataParam} = waterpotData
    const param = {
      testModelName: selectTestData.name,
      samplename: selectBigSampleData.name,
      testSystemName: selectBigTestSystemsData.name,
    }
    let url = '/excelUpload/downloadBig'
    if (dataParam) {
      const paramsArray = [];
      // 拼接参数
      Object.keys(dataParam).forEach(key => paramsArray.push(`${key  }=${  dataParam[key]}`))
      if (url.search(/\?/) === -1) {
          url += `?${  paramsArray.join('&')}`
      } else {
          url += `&${  paramsArray.join('&')}`
      }
    }
    return (
      <div className={styles.main}>
        <div className={styles.headerTools}>
          <Button type="primary" className={styles.toolsButton}>
            <a href={excel}>模板下载</a>
          </Button>
          <Button type="primary" disabled={_.isEmpty(dataParam)} className={styles.toolsButton}>
            <a href={url} download>数据下载</a>
          </Button>
          {/* <Button type="primary" disabled={_.isEmpty(dataParam)} className={styles.toolsButton} onClick={this.dataDownLoad}>
            <span>数据下载</span>
          </Button> */}
          <UploadFile catalog="bigDemo" />
          <ReduceReport />
        </div>
        <div className={styles.headerBox}>
          <span>样品选择</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择样品"
            optionFilterProp="children"
            onChange={this.handleSampleChange.bind(this)}
          >
            {
              _.uniqBy(bigSampleData, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
          <span>试验模型选择</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择模型"
            optionFilterProp="children"
            onChange={this.handleExperimentChange.bind(this)}
          >
            {
              _.uniqBy(bigTestData, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
          <span>测试系统选择</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择系统"
            optionFilterProp="children"
            onChange={this.handleTestSystemChange.bind(this)}
          >
            {
              _.uniqBy(bigTestSystemsData, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
        </div>
        <div className={styles.mainCard}>
          <SampleCard sampleData={selectBigSampleData} styleWidth="32%" />
          <InnerExperimentCard experimentData={selectTestData} styleWidth="32%" styleMarginLeft="2%" />
          <TestSystem testData={selectBigTestSystemsData} styleWidth="32%" />
        </div>
        <WaterParamAnalysis
          analysisData={waterpotData}
          handleAnalysisData={this.handleWaterPotData.bind(this)}
          param={param}
          parent='isWater'
        />
      </div>);
  }
}
