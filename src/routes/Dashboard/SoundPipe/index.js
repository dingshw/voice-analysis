import React, { Component } from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash'
import { connect } from 'dva';
import SampleCard from 'components/CardModel/SampleCard'
import BackingCard from 'components/CardModel/BackingCard'
import ParamAnalysis from 'components/CardModel/ParamAnalysis'
import UploadFile from '../UploadFile'
import ReduceReport from '../ReduceReport'
import styles from '../index.less';
import excel from '../../../../public/SamoleData.xlsx'

const Option = Select && Select.Option;

@connect(({ soundpipe }) => ({
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
  soundPipeData: soundpipe.soundPipeData,
}))
export default class SoundPipe extends Component {

  state = {
    selectSampleData: {},
    selectBackingData: {},
    dataMap: {},
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/getBackingData',
    });
    dispatch({
      type: 'soundpipe/getSampleData',
    });
  }

  handleBackingChange = (value) => {
    const { backingData } = this.props
    for(const i in backingData) {
      if (backingData[i] && backingData[i].name === value) {
        this.setState({selectBackingData: backingData[i]})
      }
    }
  }

  handleSampleChange = (value) => {
    const { sampleData } = this.props
    for(const i in sampleData) {
      if (sampleData[i] && sampleData[i].name === value) {
        this.setState({selectSampleData: sampleData[i]})
      }
    }
  }

  handleSoundPipeData = (dataMap) => {
    if(dataMap) {
      /* {
        "samplename":"阿波罗",
        "backingname":"30mm",
        "temparture":"15",
        "press":"1",
        "rateMin":"2",
        "rateMax":"100"

      } */
      const { dispatch } = this.props;
      this.setState({dataMap})
      dispatch({
        type: 'soundpipe/getSoundPipeData',
        payload: {
          ...dataMap,
        },
      });
    }
  }

  dataDownLoad = () => {
    const {dataMap} = this.state
    if(!_.isEmpty(dataMap)) {
      const { dispatch } = this.props;
      dispatch({
        type: 'soundpipe/downloadSmall',
        payload: {
          ...dataMap,
        },
      });
    }
  }

  render() {
    const { sampleData, backingData, soundPipeData } = this.props
    const { selectSampleData, selectBackingData, dataMap } = this.state

    const param = {
      backingname: selectBackingData.name,
      samplename: selectSampleData.name,
    }
    let url = `${window.origin  }/excelUpload/downloadSmall`
    if (dataMap) {
      const paramsArray = [];
      // 拼接参数
      Object.keys(dataMap).forEach(key => paramsArray.push(`${key  }=${  dataMap[key]}`))
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
          <Button type="primary" disabled={_.isEmpty(dataMap)} className={styles.toolsButton}>
            <a href={url}>数据下载</a>
          </Button>
          <UploadFile catalog="smallDemo" />
          <ReduceReport />
        </div>
        <div className={styles.headerBox}>
          <div className={styles.soundHead}>
            <span>样品选择</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择样品"
              optionFilterProp="children"
              onChange={this.handleSampleChange.bind(this)}
            >
              {
                _.uniqBy(sampleData, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
              }
            </Select>
            <span>背衬选择</span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择背衬"
              optionFilterProp="children"
              onChange={this.handleBackingChange.bind(this)}
            >
              {
                _.uniqBy(backingData, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
              }
            </Select>
          </div>
        </div>
        <div className={styles.mainCard}>
          <SampleCard sampleData={selectSampleData} />
          <BackingCard backingData={selectBackingData} />
        </div>
        <ParamAnalysis
          analysisData={soundPipeData}
          handleAnalysisData={this.handleSoundPipeData.bind(this)}
          param={param}
          parent='isSound'
        />
      </div>);
  }
}
