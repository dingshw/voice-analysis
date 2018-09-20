import React, {Component} from 'react'
import { connect } from 'dva';
import EditableTable from './EditableTable'

@connect(({ waterpot }) => ({
  bigSampleData: waterpot.bigSampleData,
  bigTestData: waterpot.bigTestData,
  bigTestSystemsData: waterpot.bigTestSystemsData,
  waterpotManageData: waterpot.waterpotManageData,
}))

export default class WaterPotData extends Component {

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
      type: 'waterpot/getWaterpotManageData',
    });
  }

  formatData = (formatdata) => {
    const data = []
    for (let i=0; i<formatdata.length; i+= 1) {
      data.push({
        key: i.toString(),
        sampleName: formatdata[i].sampleName,
        testModelName: formatdata[i].testModelName,
        testSystemName: formatdata[i].testSystemName,
        press: formatdata[i].press,
        rate: formatdata[i].rate,
        refect: formatdata[i].refect,
        temparture: formatdata[i].temparture,
        transmission: formatdata[i].transmission,
        bondacust: formatdata[i].bondacust,
        radiation: formatdata[i].radiation,
        radiationlose: formatdata[i].radiationlose,
        echoes: formatdata[i].echoes,
      });
    }
    return data
  }

  render () {

    const {waterpotManageData, bigSampleData, bigTestData, bigTestSystemsData} = this.props

    if(bigSampleData.length===0 || bigTestData.length===0
      || bigTestSystemsData.length===0 || waterpotManageData.length === 0) {
      return '';
    }
    let data = [];
    data = this.formatData(waterpotManageData)
    const columns = [
      {
        title: '样品名称',
        dataIndex: 'sampleName',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelName',
        isSelect: true,
        width: '10%',
        editable: true,
      },
      {
        title: '测试系统名称',
        dataIndex: 'testSystemName',
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
        title: '温度',
        dataIndex: 'temparture',
        isSelect: true,
        width: '6%',
        editable: true,
      },
      {
        title: '频率',
        dataIndex: 'rate',
        isSelect: true,
        width: '6%',
        editable: true,
      },
      {
        title: '反射系数',
        dataIndex: 'refect',
        width: '6%',
        editable: true,
      },
      {
        title: '投射系数',
        dataIndex: 'transmission',
        width: '6%',
        editable: true,
      },
      {
        title: '吸声系数',
        dataIndex: 'bondacust',
        width: '6%',
        editable: true,
      },
      {
        title: '回声降低',
        dataIndex: 'echoes',
        width: '6%',
        editable: true,
      },
      {
        title: '辐射声功率',
        dataIndex: 'radiation',
        width: '8%',
        editable: true,
      },
      {
        title: '辐射声功率插入损失',
        dataIndex: 'radiationlose',
        width: '8%',
        editable: true,
      },
    ]
    const modalDataMap = {bigSampleData, bigTestData, bigTestSystemsData}
    return (
      <div>
        <EditableTable columns={columns} data={data} modalDataMap={modalDataMap} type='isWater' />
      </div>
    )
  }
}
