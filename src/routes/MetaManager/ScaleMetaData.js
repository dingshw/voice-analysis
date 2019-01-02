import React, {Component} from 'react'
import { connect } from 'dva';
import {Input, Select } from 'antd'
import _ from 'lodash'
import EditableMetaTable from './EditableMetaTable'
import styles from './EdittableMetaCell.less'

const Option = Select && Select.Option

@connect(({ scalemodel }) => ({
  testModel: scalemodel.testModel,
  scaleMetaData: scalemodel.scaleMetaData,
  testConditions: scalemodel.testConditions,
  layingSchemes: scalemodel.layingSchemes,
}))

export default class scalemetadata extends Component {

  state = {
    sorter: null,
    selectedRowKeys: [],
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
    dispatch({
      type: 'scalemodel/getScaleMetaData',
    });
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
    if(_.isArray(key)) {
      dispatch({
        type: 'scalemodel/delScaleMetaList',
        payload: {pks: key},
      })
    } else {
      dispatch({
        type: 'scalemodel/delScaleMetaData',
        payload: {pk: key},
      })
    }
  }

  handelChange = (pagination, filters, sorter) => {
    if(sorter.columnKey === 'name') {
      const {scaleMetaData} = this.props
      for(let i=0; i<scaleMetaData.length-1; i++) {
        for(let j=0; j<scaleMetaData.length-1-i; j++) {
          if(sorter.order === 'descend' ? scaleMetaData[j].name>
          scaleMetaData[j+1].name:scaleMetaData[j].name<scaleMetaData[j+1].name){
            const temp=scaleMetaData[j];
            scaleMetaData[j]=scaleMetaData[j+1];
            scaleMetaData[j+1]=temp;
        }
        }
      }
      this.setState({
        scaleMetaData,
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

    const {scaleMetaData, testModel, layingSchemes, testConditions} = this.props
    let {sorter, pagination, filters} = this.state
    const {selectedRowKeys} = this.state
    sorter = sorter || {}
    pagination = pagination || {}
    filters = filters || {}
    let data = [];
    if(this.state && this.state.scaleMetaData) {
      data = this.formatData(this.state.scaleMetaData)
    } else {
      data = this.formatData(scaleMetaData)
    }
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '20%',
        sorter: true,
        sortOrder: sorter.columnKey === 'name' && sorter.order,
        editable: false,
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelObjName',
        isSelect: true,
        width: '20%',
        editable: false,
      },
      {
        title: '试验情况名称',
        dataIndex: 'testConditionName',
        isSelect: true,
        width: '22%',
        editable: false,
      },
      {
        title: '敷设方案名称',
        dataIndex: 'layingSchemeName',
        isSelect: true,
        width: '22%',
        editable: false,
      },
    ]
    const metaContent = {
      name: '',testModelObjName: '', testConditionName:'',layingSchemeName:'',
    }
    const selectMap = {
      testModelObjName: testModel,
      testConditionName: testConditions,
      layingSchemeName: layingSchemes,
    }
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
                      return (<Option key={item.name}>{item.name}</Option>)
                    } else {
                      return (<Option key={item}>{item}</Option>)
                    }
                  })
                }
              </Select>
            </div>
          ))}
        </div>
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
          handelChange={this.handelChange}
          filters={filters}
          pagination={pagination}
          changeFilters={this.changeFilters}
          rowSelection={rowSelection}
          selectedRowKeys={selectedRowKeys}
        />
      </div>
    )
  }
}
