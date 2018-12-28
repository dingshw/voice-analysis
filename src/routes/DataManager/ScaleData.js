import React, {Component} from 'react'
import { connect } from 'dva';
import { Button, Select, Input } from 'antd';
import _ from 'lodash'
import DataManageModal from '../../components/DataManageModal/DataManageModal'
import EditableTable from './EditableTable'
import styles from './EdittableCell.less'

const Option = Select && Select.Option

@connect(({ scalemodel }) => ({
  scaleCondition: scalemodel.scaleCondition,
  scaleManage: scalemodel.scaleManage,
  scaleMetaData: scalemodel.scaleMetaData,
  testModel: scalemodel.testModel,
  testConditions: scalemodel.testConditions,
  layingSchemes: scalemodel.layingSchemes,
}))

export default class scaledata extends Component {

  state = {
    sorter: null,
    showModal: false,
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
    dispatch({
      type: 'scalemodel/getScaleManageData',
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
        rate: formatdata[i].rate,
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

  handleScaleCondition = (dataMap) => {
    if(dataMap) {
      const { dispatch } = this.props;
      dispatch({
        type: 'scalemodel/getScaleCondition',
        payload: {
          ...dataMap,
        },
      });
    }
  }

  handelAddData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/addScaleData',
      payload: dataMap,
    });
  }

  handelUpdateData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/updateScaleData',
      payload: dataMap,
    });
  }

  handelDelData = (key) => {
    const { dispatch } = this.props;
    if(_.isArray(key)) {
      dispatch({
        type: 'scalemodel/delScaleDataList',
        payload: {pks: key},
      })
    } else {
      dispatch({
        type: 'scalemodel/delScaleData',
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

    const {scaleManage, scaleCondition, scaleMetaData, testModel, layingSchemes, testConditions} = this.props
    let {sorter, filters, pagination} = this.state
    const {showModal, selectedRowKeys} = this.state
    sorter = sorter || {}
    filters = filters || {}
    pagination = pagination || {}
    let data = [];
    if(this.state && this.state.scaleManage) {
      data = this.formatData(this.state.scaleManage)
    } else {
      data = this.formatData(scaleManage)
    }
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '10%',
        sorter: true,
        sortOrder: sorter.columnKey === 'name' && sorter.order,
        editable: false,
        // selectdata: sampleData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '试验模型名称',
        dataIndex: 'testModelObjName',
        isSelect: true,
        width: '9%',
        editable: false,
      },
      {
        title: '试验情况名称',
        dataIndex: 'testConditionName',
        isSelect: true,
        width: '9%',
        editable: false,
      },
      {
        title: '敷设方案名称',
        dataIndex: 'layingSchemeName',
        isSelect: true,
        width: '9%',
        editable: false,
      },
      {
        title: '频率',
        dataIndex: 'rate',
        isSelect: true,
        width: '6%',
        sorter: (a, b) => a.rate - b.rate,
        sortOrder: sorter.columnKey === 'rate' && sorter.order,
        editable: false,
      },
      {
        title: '光壳声目标强度',
        dataIndex: 'lightShellTS',
        isSelect: true,
        width: '7%',
        editable: true,
      },
      {
        title: '光壳辐射声功率',
        dataIndex: 'lightShellSP',
        isSelect: true,
        width: '7%',
        editable: true,
      },
      {
        title: '敷瓦声目标强度',
        dataIndex: 'layingShellTS',
        width: '7%',
        editable: true,
      },
      {
        title: '敷瓦辐射声功率',
        dataIndex: 'layingShellSP',
        width: '7%',
        editable: true,
      },
      {
        title: '声目标强度降低量',
        dataIndex: 'reductionTS',
        width: '7%',
        editable: true,
      },
      {
        title: '辐射声功率插入损失',
        dataIndex: 'reductionSP',
        width: '8%',
        editable: true,
      },
    ]
    const modalDataMap = {scaleCondition}
    const selectMap = {
      testModelObjName: testModel,
      testConditionName: testConditions,
      layingSchemeName: layingSchemes,
    }
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
        {showModal? '':''}
        <div style={{display: 'flex', alignItems: 'baseline'}}>
          <DataManageModal
            metaData={scaleMetaData}
            type='isSound'
            handelAddData={this.handelAddData}
            modalDataMap={modalDataMap}
            handelCompute={this.handleSoundPipeData}
          />
          <Button disabled={!hasSelected} type="primary" style={{ marginBottom: 10 }} onClick={this.handleSelectDelete}>
            批量删除
          </Button>
        </div>
        <EditableTable
          key={Math.random()}
          columns={columns}
          data={data}
          modalDataMap={modalDataMap}
          metaData={scaleMetaData}
          selectMap={selectMap}
          type='isScale'
          handelCompute={this.handleScaleCondition}
          handelAddData={this.handelAddData}
          handelUpdateData={this.handelUpdateData}
          handelDelData={this.handelDelData}
          handelChange={this.handelChange}
          filters={filters}
          pagination={pagination}
          changeFilters={this.changeFilters}
          rowSelection={rowSelection}
        />
      </div>
    )
  }
}
