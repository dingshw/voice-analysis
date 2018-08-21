import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import SampleCard from 'components/CardModel/SampleCard'
import BackingCard from 'components/CardModel/BackingCard'
import ExperimentCard from 'components/CardModel/ExperimentCard'
import ParamAnalysis from 'components/CardModel/ParamAnalysis'
import styles from '../index.less';

const Option = Select.Option;

@connect(({ soundpipe }) => ({
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
  soundPipeData: soundpipe.soundPipeData,
}))
export default class SoundPipe extends Component {

  state = {
    selectSampleData: {},
    selectBackingData: {},
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
        "backgroundtype":"30mm",
        "temparture":"15",
        "press":"1",
        "rateMin":"2",
        "rateMax":"100"

      } */
      const { selectBackingData, selectSampleData } = this.state
      const { dispatch } = this.props;
      dispatch({
        type: 'soundpipe/getSoundPipeData',
        payload: {
          ...dataMap,
          backgroundtype: selectBackingData.name,
          samplename: selectSampleData.name,
        },
      });
    }
  }

  render() {
    const { sampleData, backingData, soundPipeData } = this.props
    const { selectSampleData, selectBackingData } = this.state

    const selectAnalysisName = `${selectSampleData.name  } ${  selectBackingData.name}`
    return (
      <div className={styles.main}>
        <div className={styles.headerBox}>
          <span>试验模型</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择模型"
            optionFilterProp="children"
            onChange={this.handleBackingChange.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              backingData.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
          <span>试验时间</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择时间"
            optionFilterProp="children"
            onChange={this.handleSampleChange.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              sampleData.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
          <span>敷设方案</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择敷设方案"
            optionFilterProp="children"
            onChange={this.handleSampleChange.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              sampleData.map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
        </div>
        <div className={styles.mainCard}>
          <SampleCard sampleData={selectSampleData} styleWidth="32%" />
          <ExperimentCard experimentData={selectSampleData} styleWidth="32%" styleMarginLeft="2%" />
          <BackingCard backingData={selectBackingData} styleWidth="32%" />
        </div>
        <ParamAnalysis analysisData={soundPipeData} selectAnalysisName={selectAnalysisName} handleAnalysisData={this.handleSoundPipeData.bind(this)} />
      </div>);
  }
}
