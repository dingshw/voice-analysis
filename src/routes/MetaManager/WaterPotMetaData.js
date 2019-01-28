import React, {Component} from 'react'
import { connect } from 'dva';
import {Input, Select } from 'antd'
import _ from 'lodash'
import EditableMetaTable from './EditableMetaTable'
import styles from './EdittableMetaCell.less'

const Option = Select && Select.Option

@connect(({ waterpot }) => ({
  waterMetaData: waterpot.waterMetaData,
  bigSampleData: waterpot.bigSampleData,
  bigTestData: waterpot.bigTestData,
  bigTestSystemsData: waterpot.bigTestSystemsData,
}))

export default class WaterPotMetaData extends Component {

  state = {
    sorter: null,
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
    if(_.isArray(key)) {
      dispatch({
        type: 'waterpot/delWaterMetaList',
        payload: {pks: key},
      })
    } else {
      dispatch({
        type: 'waterpot/delWaterMetaData',
        payload: {pk: key},
      })
    }
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
      const {waterMetaData} = this.props
      for(let i=0; i<waterMetaData.length-1; i++) {
        for(let j=0; j<waterMetaData.length-1-i; j++) {
          if(this.sortName(sorter.order, waterMetaData[j], waterMetaData[j+1])){
            const temp=waterMetaData[j];
            waterMetaData[j]=waterMetaData[j+1];
            waterMetaData[j+1]=temp;
        }
        }
      }
      this.setState({
        waterMetaData,
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

  handleChange(key, value) {
    let {filters} = this.state
    filters =filters || {}
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
    this.setState({ filters });

  }

  render () {

    const {waterMetaData,bigSampleData, bigTestData, bigTestSystemsData} = this.props
    let {sorter, pagination, filters} = this.state
    const {selectedRowKeys} = this.state
    sorter = sorter || {}
    pagination = pagination || {}
    filters = filters || {}
    let data = [];
    if(this.state && this.state.waterMetaData) {
      data = this.formatData(this.state.waterMetaData)
    } else {
      data = this.formatData(waterMetaData)
    }
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '14%',
        sorter: true,
        sortOrder: sorter.columnKey === 'name' && sorter.order,
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
        sortOrder: sorter.columnKey === 'press' && sorter.order,
        editable: false,
      },
      {
        title: '温度',
        dataIndex: 'temparture',
        isSelect: true,
        width: '14%',
        sorter: (a, b) => a.temparture - b.temparture,
        sortOrder: sorter.columnKey === 'temparture' && sorter.order,
        editable: false,
      },
    ]
    const metaContent = {
      name: '',sampleName: '', testModelName:'',testSystemName: '',press:'',temparture:'',
    }
    const selectMap = {sampleName: bigSampleData, testModelName: bigTestData, testSystemName: bigTestSystemsData}
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div className={styles.filterlist}>
          <div className={styles.filteritem}>
            元数据
            <Input className={styles.iteminput} onChange={this.handleChange.bind(this, 'name')} />
          </div>
          {Object.keys(selectMap).map((key) => (
            <div key={key} style={{marginLeft: '10px'}}>
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
                      return (<Option key={item.name} title={item.name}>{item.name}</Option>)
                    } else {
                      return (<Option key={item} title={item}>{item}</Option>)
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
        </div>
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
          handelChange={this.handelChange}
          rowSelection={rowSelection}
          pagination={pagination}
          filters={filters}
          selectedRowKeys={selectedRowKeys}
        />
      </div>
    )
  }
}
