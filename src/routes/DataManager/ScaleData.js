import React, {Component} from 'react'
import { connect } from 'dva';
import EditableTable from './EditableTable'

@connect(({ scalemodel }) => ({
  testModel: scalemodel.testModel,
  testConditions: scalemodel.testConditions,
  layingSchemes: scalemodel.layingSchemes,
  scaleManage: scalemodel.scaleManage,
}))

export default class scaledata extends Component {

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
      type: 'scalemodel/getScaleManageData',
    });
  }

  formatData = (formatdata) => {
    const data = []
    for (let i=0; i<formatdata.length; i+= 1) {
      data.push({
        key: i.toString(),
        testModelObjName: formatdata[i].testModelObjName,
        layingSchemeName: formatdata[i].layingSchemeName,
        testConditionName: formatdata[i].testConditionName,
        press: formatdata[i].press,
        lightShellTS: formatdata[i].lightShellTS,
        lightShellSP: formatdata[i].lightShellSP,
        layingShellTS: formatdata[i].layingShellTS,
        layingShellSP: formatdata[i].layingShellSP,
        reductionTS: formatdata[i].reductionTS,
        reductionSP: formatdata[i].reductionSP,
      });
    }
    return data
  }

  render () {

    const {scaleManage, testModel, layingSchemes, testConditions} = this.props
    if(testModel.length===0 || layingSchemes.length===0
      || testConditions.length===0 || scaleManage.length===0) {
      return '';
    }
    let data = [];
    data = this.formatData(scaleManage)
    const columns = [
      {
        title: '试验模型名称',
        dataIndex: 'testModelObjName',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '试验情况名称',
        dataIndex: 'testConditionName',
        isSelect: true,
        width: '10%',
        editable: true,
      },
      {
        title: '敷设方案名称',
        dataIndex: 'layingSchemeName',
        isSelect: true,
        width: '10%',
        editable: true,
      },
      {
        title: '压力',
        dataIndex: 'press',
        isSelect: true,
        width: '6%',
        editable: true,
      },
      {
        title: '光壳声目标强度',
        dataIndex: 'lightShellTS',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '光壳辐射声功率',
        dataIndex: 'lightShellSP',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '敷瓦声目标强度',
        dataIndex: 'layingShellTS',
        width: '8%',
        editable: true,
      },
      {
        title: '敷瓦辐射声功率',
        dataIndex: 'layingShellSP',
        width: '8%',
        editable: true,
      },
      {
        title: '声目标强度降低量',
        dataIndex: 'reductionTS',
        width: '8%',
        editable: true,
      },
      {
        title: '辐射声功率插入损失',
        dataIndex: 'reductionSP',
        width: '8%',
        editable: true,
      },
    ]
    const modalDataMap = {testModel, layingSchemes, testConditions}
    return (
      <div>
        <EditableTable columns={columns} data={data} modalDataMap={modalDataMap} type='isScale' />
      </div>
    )
  }
}
