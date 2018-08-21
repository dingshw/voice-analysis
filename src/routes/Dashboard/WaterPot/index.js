import React, { Component } from 'react';
import { Select } from 'antd';
import SampleCard from 'components/CardModel/SampleCard'
import ParamAnalysis from 'components/CardModel/ParamAnalysis'
import ExperimentCard from 'components/CardModel/ExperimentCard'
import TestSystem from 'components/CardModel/TestSystem'
import styles from '../index.less';

const Option = Select.Option;

export default class SoundPipe extends Component {

  state = {
    selectSampleData: {},
    selectExperimentData: {},
    selectTestData: {},
  }

  handleSampleChange = (value) => {
    const { sampleData } = this.props
    for(const i in sampleData) {
      if (sampleData[i] && sampleData[i].name === value) {
        this.setState({selectSampleData: sampleData[i]})
      }
    }
  }

  handleExperimentChange = (value) => {
    const { experimentData } = this.props
    for(const i in experimentData) {
      if (experimentData[i] && experimentData[i].name === value) {
        this.setState({selectExperimentData: experimentData[i]})
      }
    }
  }

  handleTestChange = (value) => {
    const { testData } = this.props
    for(const i in testData) {
      if (testData[i] && testData[i].name === value) {
        this.setState({selectTestData: testData[i]})
      }
    }
  }

  handleWaterPotData = (dataMap) => {
    if(dataMap) {
      /* {
        "samplename":"阿波罗",
        "backgroundtype":"30mm",
        "temparture":"15",
        "press":"1",
        "rateMin":"2",
        "rateMax":"100"

      } */
      const { selectExperimentData, selectTestData, selectSampleData } = this.state
      const { dispatch } = this.props;
      dispatch({
        type: 'soundpipe/getSoundPipeData',
        payload: {
          ...dataMap,
          experimentname: selectExperimentData.name,
          samplename: selectSampleData.name,
          testname: selectTestData.name,
        },
      });
    }
  }

  render() {
    const { selectSampleData, selectExperimentData, selectTestData } = this.state

    return (
      <div className={styles.main}>
        <div className={styles.headerBox}>
          <span>样品选择</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择样品"
            optionFilterProp="children"
            onChange={this.handleSampleChange.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>

          <span>试验模型选择</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择模型"
            optionFilterProp="children"
            onChange={this.handleExperimentChange.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>

          <span>测试系统选择</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择系统"
            optionFilterProp="children"
            onChange={this.handleTestChange.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>
        <div className={styles.mainCard}>
          <SampleCard sampleData={selectSampleData} styleWidth="32%" />
          <ExperimentCard experimentData={selectExperimentData} styleWidth="32%" styleMarginLeft="2%" />
          <TestSystem testData={selectTestData} styleWidth="32%" />
        </div>
        <ParamAnalysis handleAnalysisData={this.handleWaterPotData.bind(this)} />
      </div>);
  }
}
