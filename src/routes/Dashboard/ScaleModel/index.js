import React, { Component } from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash'
import { connect } from 'dva';
import LayingScheme from 'components/CardModel/LayingScheme'
import OuterExperimentCard from 'components/CardModel/OuterExperimentCard'
import ExperimentCondition from 'components/CardModel/ExperimentCondition'
import ScaleParamAnalysis from 'components/CardModel/ScaleParamAnalysis'
import UploadFile from '../UploadFile'
import ReduceReport from '../ReduceReport'
import styles from '../index.less';
import excel from '../../../../public/SamoleData.xlsx'

const Option = Select && Select.Option;

@connect(({ scalemodel }) => ({
  testModel: scalemodel.testModel,
  testConditions: scalemodel.testConditions,
  layingSchemes: scalemodel.layingSchemes,
  scaleCondition: scalemodel.scaleCondition,
}))
export default class ScaleModel extends Component {

  state = {
    selectTestModel: {},
    selectTestConditions: {},
    selectLayingSchemes: {},
    dataMap: {},
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/getTestModel',
    });
    dispatch({
      type: 'scalemodel/getTestConditions',
    });
    dispatch({
      type: 'scalemodel/getLayingSchemes',
    });
  }

  handleTestModel = (value) => {
    const { testModel } = this.props
    for(const i in testModel) {
      if (testModel[i] && testModel[i].name === value) {
        this.setState({selectTestModel: testModel[i]})
      }
    }
  }

  handleTestConditions = (value) => {
    const { testConditions } = this.props
    for(const i in testConditions) {
      if (testConditions[i] && testConditions[i].name === value) {
        this.setState({selectTestConditions: testConditions[i]})
      }
    }
  }

  handleLayingSchemes = (value) => {
    const { layingSchemes } = this.props
    for(const i in layingSchemes) {
      if (layingSchemes[i] && layingSchemes[i].name === value) {
        this.setState({selectLayingSchemes: layingSchemes[i]})
      }
    }
  }

  handleScaleCondition = (dataMap) => {
    if(dataMap) {
      const { dispatch } = this.props;
      this.setState({dataMap})
      dispatch({
        type: 'scalemodel/getScaleCondition',
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
        type: 'scalemodel/downloadScale',
        payload: {
          ...dataMap,
        },
      });
    }
  }

  render() {
    const { testModel, testConditions, layingSchemes, scaleCondition } = this.props
    const { selectTestConditions, selectTestModel, selectLayingSchemes,dataMap } = this.state

    const selectAnalysisName = `${selectTestModel.name  } ${  selectTestConditions.name} ${  selectLayingSchemes.name}`
    const isScaleModel = true
    const param = {
      testModelObjName: selectTestModel.name,
      testConditionName: selectTestConditions.name,
      layingSchemeName: selectLayingSchemes.name,
    }
    let url = `${window.origin  }/excelUpload/downloadScale`
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
          <UploadFile catalog="conDemo" />
          <ReduceReport />
        </div>
        <div className={styles.headerBox}>
          <span>试验模型</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择模型"
            optionFilterProp="children"
            onChange={this.handleTestModel.bind(this)}
          >
            {
              _.uniqBy(testModel, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
          <span>试验情况</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择试验情况"
            optionFilterProp="children"
            onChange={this.handleTestConditions.bind(this)}
          >
            {
              _.uniqBy(testConditions, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
          <span>敷设方案</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择敷设方案"
            optionFilterProp="children"
            onChange={this.handleLayingSchemes.bind(this)}
          >
            {
              _.uniqBy(layingSchemes, 'name').map(item => <Option key={item.name} value={item.name}>{item.name}</Option>)
            }
          </Select>
        </div>
        <div className={styles.mainCard}>
          <OuterExperimentCard experimentData={selectTestModel} styleWidth="32%" />
          <ExperimentCondition experimentData={selectTestConditions} styleWidth="32%" styleMarginLeft="2%" />
          <LayingScheme experimentData={selectLayingSchemes} styleWidth="32%" />
        </div>
        <ScaleParamAnalysis
          isScaleModel={isScaleModel}
          param={param}
          analysisData={scaleCondition}
          selectAnalysisName={selectAnalysisName}
          handleAnalysisData={this.handleScaleCondition.bind(this)}
        />
      </div>);
  }
}
