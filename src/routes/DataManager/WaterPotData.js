import React, {Component} from 'react'
import { connect } from 'dva';
import { Button, Select, Input } from 'antd';
import _ from 'lodash'
import DataManageModal from '../../components/DataManageModal/DataManageModal'
import EditableTable from './EditableTable'
import styles from './EdittableCell.less'

const Option = Select && Select.Option

@connect(({ waterpot }) => ({
  waterpotData: waterpot.waterpotData,
  waterpotManageData: waterpot.waterpotManageData,
  waterMetaData: waterpot.waterMetaData,
  bigSampleData: waterpot.bigSampleData,
  bigTestData: waterpot.bigTestData,
  bigTestSystemsData: waterpot.bigTestSystemsData,
}))

export default class WaterPotData extends Component {

  state = {
    sorter: null,
    showModal: false,
    selectedRowKeys: [],
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
    dispatch({
      type: 'waterpot/getWaterMetaData',
    });
    dispatch({
      type: 'waterpot/getWaterpotManageData',
    });
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
        name: formatdata[i].name,
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

  sortName = (order, obj1, obj2) => {
    const reg = /(\d+)$/g
    const reg1 = /(\d+)$/g
    const result1 = reg.exec(obj1.name)
    const result2 = reg1.exec(obj2.name)
    if(order === 'descend') {
      if(result1 && result2 && (obj1.name.substr(0,result1.index) === obj2.name.substr(0,result2.index))) {
        return Number(result1[0]) > Number(result2[0])
      } else {
        return obj1.name > obj2.name
      }
    } else if(result1 && result2 && (obj1.name.substr(0,result1.index) === obj2.name.substr(0,result2.index))) {
        return Number(result1[0]) <= Number(result2[0])
      } else {
        return obj1.name <= obj2.name
      }
  }

  handelChange = (pagination, filters, sorter) => {
    if(sorter.columnKey === 'name') {
      const {waterpotManageData} = this.props
      for(let i=0; i<waterpotManageData.length-1; i++) {
        for(let j=0; j<waterpotManageData.length-1-i; j++) {
          if(this.sortName(sorter.order, waterpotManageData[j], waterpotManageData[j+1])){
            const temp=waterpotManageData[j];
            waterpotManageData[j]=waterpotManageData[j+1];
            waterpotManageData[j+1]=temp;
        }
        }
      }
      this.setState({
        waterpotManageData,
        sorter,
        pagination,
      })
    } else {
      this.setState({
        sorter,
        pagination,
      })
    }
  }

  changeFilters = (filters) => {
    this.setState({filters})
  }

  handleAdd = () => {
    this.setState({showModal: true})
  }

  handleChange(key, value) {
    let {filters} = this.state
    filters = filters || {}
    let valueTemp = value
    if(value && value.target){
      valueTemp = value.target.value
    }
    if(key === 'rate' && valueTemp && valueTemp !== '') {
      const rateMin = valueTemp.substring(0, valueTemp.indexOf('-')) * 1000
      const rateMax = valueTemp.substring(valueTemp.indexOf('-')+1, valueTemp.indexOf('k')) * 1000
      filters[key] = [rateMin, rateMax]
    } else {
      filters[key] = valueTemp
    }
    this.changeFilters(filters)

  }

  render () {

    const {waterpotManageData, waterpotData, waterMetaData,
      bigSampleData, bigTestData, bigTestSystemsData} = this.props
    let {sorter, filters, pagination} = this.state
    const {showModal, selectedRowKeys} = this.state
    sorter = sorter || {}
    filters = filters || {}
    pagination = pagination || {}
    let data = [];
    if(this.state && this.state.waterpotManageData) {
      data = this.formatData(this.state.waterpotManageData)
    } else {
      data = this.formatData(waterpotManageData)
    }
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '9%',
        sorter: true,
        editable: false,
        sortOrder: sorter.columnKey === 'name' && sorter.order,
        selectdata: [],
      },
      {
        title: '样品名称',
        dataIndex: 'sampleName',
        isSelect: true,
        width: '7%',
        editable: false,
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelName',
        isSelect: true,
        width: '9%',
        editable: false,
      },
      {
        title: '测试系统名称',
        dataIndex: 'testSystemName',
        isSelect: true,
        width: '9%',
        editable: false,
      },
      {
        title: '压力',
        dataIndex: 'press',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => a.press - b.press,
        sortOrder: sorter.columnKey === 'press' && sorter.order,
        editable: false,
      },
      {
        title: '温度',
        dataIndex: 'temparture',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => a.temparture - b.temparture,
        sortOrder: sorter.columnKey === 'temparture' && sorter.order,
        editable: false,
      },
      {
        title: '频率',
        dataIndex: 'rate',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => {
          return a.rate - b.rate
        },
        sortOrder: sorter.columnKey === 'rate' && sorter.order,
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
        width: '5%',
        editable: true,
      },
      {
        title: '辐射声功率插入损失',
        dataIndex: 'radiationlose',
        width: '6%',
        editable: true,
      },
    ]
    const modalDataMap = {waterpotData}
    const selectMap = {sampleName: bigSampleData, testModelName: bigTestData, testSystemName: bigTestSystemsData}
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div className={styles.filterlist}>
          <div className={styles.filteritem}>
            元数据
            <Input className={styles.iteminput} onChange={this.handleChange.bind(this, 'name')} />
          </div>
          {Object.keys(selectMap).map((key) => (
            <div key={key} className={styles.filteritem}>
              {(key.toLowerCase() === 'samplename' && '样品名称')
                || (key === 'backingname' && '背衬名称')
                || (key === 'testModelName' && '试验模型名称')
                || (key === 'testSystemName' && '测试系统名称')
                || (key === 'testModelObjName' && '试验模型名称')
                || (key === 'testConditionName' && '试验情况名称')
                || (key === 'layingSchemeName' && '敷设方案名称')
              }
              <Select
                className={styles.iteminput}
                placeholder=""
                onChange={this.handleChange.bind(this, key)}
                allowClear
              >
                {
                  selectMap[key].map(item => {
                    if(_.isObject(item)) {
                      return (<Option key={item.name}>{item.name}</Option>)
                    } else {
                      return (<Option key={item}>{item}</Option>)
                    }
                  })
                }
              </Select>
            </div>
          ))}
          <div className={styles.filteritem}>
            压力
            <Select
              className={styles.iteminput}
              onChange={this.handleChange.bind(this, 'press')}
              allowClear
            >
              {
                [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </div>
          <div className={styles.filteritem}>
            温度
            <Select
              className={styles.iteminput}
              onChange={this.handleChange.bind(this, 'temparture')}
              allowClear
            >
              {
                [0,5,10,15,20,25,30].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </div>
          {
            <div className={styles.filteritem}>
              频率
              <Select
                className={styles.iteminput}
                onChange={this.handleChange.bind(this, 'rate')}
                allowClear
              >
                {
                  ['0-1k','1-3k','3-10k','10-30k'].map(item => {
                    if(_.isObject(item)) {
                      return (<Option key={item.name}>{item.name}</Option>)
                    } else {
                      return (<Option key={item}>{item}</Option>)
                    }
                  })
                }
              </Select>
            </div>
          }
        </div>
        <EditableTable
          key={Math.random()}
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
          handelChange={this.handelChange}
          filters={filters}
          pagination={pagination}
          changeFilters={this.changeFilters}
        />
      </div>
    )
  }
}
