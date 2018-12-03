import React, {Component} from 'react'
import { connect } from 'dva';
import EditableMetaTable from './EditableMetaTable'

@connect(({ scalemodel }) => ({
  testModel: scalemodel.testModel,
  scaleMetaData: scalemodel.scaleMetaData,
  testConditions: scalemodel.testConditions,
  layingSchemes: scalemodel.layingSchemes,
}))

export default class scalemetadata extends Component {

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
    dispatch({
      type: 'scalemodel/getScaleMetaData',
    });
  }

  formatData = (formatdata) => {
    const data = []
    for (let i=0; i<formatdata.length; i+= 1) {
      data.push({
        key: i.toString(),
        pk: formatdata[i].pk,
        metaname: formatdata[i].metaname,
        testModelObjName: formatdata[i].testModelObjName,
        layingSchemeName: formatdata[i].layingSchemeName,
        testConditionName: formatdata[i].testConditionName,
        press: formatdata[i].press,
      });
    }
    return data
  }

  handelAddData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/addScaleMetaData',
      payload: dataMap,
    });
  }

  handelUpdateData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/updateScaleMetaData',
      payload: dataMap,
    });
  }

  handelDelData = (key) => {
    const { dispatch } = this.props;
    if(key) {
      dispatch({
        type: 'scalemodel/delScaleMetaData',
        payload: {pk: key},
      })
    }
  }

  render () {

    const {scaleMetaData, testModel, layingSchemes, testConditions} = this.props
    let data = [];
    data = this.formatData(scaleMetaData)
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'metaname',
        isSelect: true,
        width: '16%',
        editable: false,
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelObjName',
        isSelect: true,
        width: '16%',
        editable: false,
      },
      {
        title: '试验情况名称',
        dataIndex: 'testConditionName',
        isSelect: true,
        width: '16%',
        editable: false,
      },
      {
        title: '敷设方案名称',
        dataIndex: 'layingSchemeName',
        isSelect: true,
        width: '16',
        editable: false,
      },
    ]
    const metaContent = {
      metaname: '',testModelObjName: '', testConditionName:'',layingSchemeName:'',
    }
    const selectMap = {
      testModelObjName: testModel,
      testConditionName: testConditions,
      layingSchemeName: layingSchemes,
    }
    return (
      <div>
        <EditableMetaTable
          key={Math.random()}
          columns={columns}
          data={data}
          selectMap={selectMap}
          type='isScale'
          catalog='conDemo'
          metaContent={metaContent}
          handelAddData={this.handelAddData}
          handelUpdateData={this.handelUpdateData}
          handelDelData={this.handelDelData}
        />
      </div>
    )
  }
}
