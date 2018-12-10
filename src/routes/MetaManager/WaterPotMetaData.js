import React, {Component} from 'react'
import { connect } from 'dva';
import EditableMetaTable from './EditableMetaTable'

@connect(({ waterpot }) => ({
  waterMetaData: waterpot.waterMetaData,
  bigSampleData: waterpot.bigSampleData,
  bigTestData: waterpot.bigTestData,
  bigTestSystemsData: waterpot.bigTestSystemsData,
}))

export default class WaterPotMetaData extends Component {

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
    dispatch({
      type: 'waterpot/getWaterMetaData',
    });
  }

  handelAddData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/addWaterMetaData',
      payload: dataMap,
    });
  }

  handelUpdateData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/updateWaterMetaData',
      payload: dataMap,
    });
  }

  handelDelData = (key) => {
    const { dispatch } = this.props;
    if(key) {
      dispatch({
        type: 'waterpot/delWaterMetaData',
        payload: {pk: key},
      })
    }
  }

  formatData = (formatdata) => {
    const data = []
    for (let i=0; i<formatdata.length; i+= 1) {
      data.push({
        key: i.toString(),
        pk: formatdata[i].pk,
        name: formatdata[i].name,
        sampleName: formatdata[i].sampleName,
        testModelName: formatdata[i].testModelName,
        testSystemName: formatdata[i].testSystemName,
        press: formatdata[i].press,
        temparture: formatdata[i].temparture,
      });
    }
    return data
  }

  render () {

    const {waterMetaData,bigSampleData, bigTestData, bigTestSystemsData} = this.props

    let data = [];
    data = this.formatData(waterMetaData)
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '14%',
        editable: false,
      },
      {
        title: '样品名称',
        dataIndex: 'sampleName',
        isSelect: true,
        width: '14%',
        editable: false,
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelName',
        isSelect: true,
        width: '14%',
        editable: false,
      },
      {
        title: '测试系统名称',
        dataIndex: 'testSystemName',
        isSelect: true,
        width: '14%',
        editable: false,
      },
      {
        title: '压力',
        dataIndex: 'press',
        isSelect: true,
        width: '14%',
        sorter: (a, b) => a.press - b.press,
        editable: false,
      },
      {
        title: '温度',
        dataIndex: 'temparture',
        isSelect: true,
        width: '14%',
        sorter: (a, b) => a.temparture - b.temparture,
        editable: false,
      },
    ]
    const metaContent = {
      name: '',sampleName: '', testModelName:'',testSystemName: '',press:'',temparture:'',
    }
    const selectMap = {sampleName: bigSampleData, testModelName: bigTestData, testSystemName: bigTestSystemsData}
    return (
      <div>
        <EditableMetaTable
          key={Math.random()}
          columns={columns}
          data={data}
          selectMap={selectMap}
          type='isWater'
          catalog='bigDemo'
          metaContent={metaContent}
          handelAddData={this.handelAddData}
          handelUpdateData={this.handelUpdateData}
          handelDelData={this.handelDelData}
        />
      </div>
    )
  }
}
