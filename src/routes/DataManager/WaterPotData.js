import React, {Component} from 'react'
import _ from 'lodash'
import { connect } from 'dva';
import EditableTable from './EditableTable'

@connect(({ waterpot }) => ({
  waterpotData: waterpot.waterpotData,
  waterpotManageData: waterpot.waterpotManageData,
  waterMetaData: waterpot.waterMetaData,
  bigSampleData: waterpot.bigSampleData,
  bigTestData: waterpot.bigTestData,
  bigTestSystemsData: waterpot.bigTestSystemsData,
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
      type: 'waterpot/getWaterMetaData',
    });
    dispatch({
      type: 'waterpot/getWaterpotManageData',
    });
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

  handelAddData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/addWaterData',
      payload: dataMap,
    });
  }

  handelUpdateData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/updateWaterData',
      payload: dataMap,
    });
  }

  handelDelData = (key) => {
    const { dispatch } = this.props;
    if(_.isArray(key)) {
      dispatch({
        type: 'waterpot/delWaterDataList',
        payload: {pks: key},
      })
    } else {
      dispatch({
        type: 'waterpot/delWaterData',
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

    const {waterpotManageData, waterpotData, waterMetaData,
      bigSampleData, bigTestData, bigTestSystemsData} = this.props

    let data = [];
    data = this.formatData(waterpotManageData)
    const columns = [
      {
        title: '样品名称',
        dataIndex: 'sampleName',
        isSelect: true,
        width: '8%',
        editable: false,
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelName',
        isSelect: true,
        width: '10%',
        editable: false,
      },
      {
        title: '测试系统名称',
        dataIndex: 'testSystemName',
        isSelect: true,
        width: '10%',
        editable: false,
      },
      {
        title: '压力',
        dataIndex: 'press',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => a.press - b.press,
        editable: false,
      },
      {
        title: '温度',
        dataIndex: 'temparture',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => a.temparture - b.temparture,
        editable: false,
      },
      {
        title: '频率',
        dataIndex: 'rate',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => a.rate - b.rate,
        editable: false,
      },
      {
        title: '反射系数',
        dataIndex: 'refect',
        width: '6.5%',
        editable: true,
      },
      {
        title: '透射系数',
        dataIndex: 'transmission',
        width: '6.5%',
        editable: true,
      },
      {
        title: '吸声系数',
        dataIndex: 'bondacust',
        width: '6.5%',
        editable: true,
      },
      {
        title: '回声降低',
        dataIndex: 'echoes',
        width: '6.5%',
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
    const modalDataMap = {waterpotData}
    const selectMap = {sampleName: bigSampleData, testModelName: bigTestData, testSystemName: bigTestSystemsData}
    return (
      <div>
        <EditableTable
          key={data.length}
          columns={columns}
          data={data}
          modalDataMap={modalDataMap}
          selectMap={selectMap}
          metaData={waterMetaData}
          type='isWater'
          handelCompute={this.handleWaterPotData}
          handelAddData={this.handelAddData}
          handelUpdateData={this.handelUpdateData}
          handelDelData={this.handelDelData}
        />
      </div>
    )
  }
}
