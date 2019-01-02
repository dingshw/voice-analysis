import React, {Component} from 'react'
import { connect } from 'dva';
import {Input, Select } from 'antd'
import _ from 'lodash'
import EditableMetaTable from './EditableMetaTable'
import styles from './EdittableMetaCell.less'

const Option = Select && Select.Option
@connect(({ soundpipe }) => ({
  soundMetaData: soundpipe.soundMetaData,
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
}))

export default class SoundMetaData extends Component {

  state = {
    sorter: null,
    selectedRowKeys: [],
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/getBackingData',
    });
    dispatch({
      type: 'soundpipe/getSampleData',
    });
    dispatch({
      type: 'soundpipe/getSoundMetaData',
      payload: {
      },
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
        samplename: formatdata[i].samplename,
        samplepk: formatdata[i].samplepk,
        backingname: formatdata[i].backingname,
        bakingpk: formatdata[i].bakingpk,
        press: formatdata[i].press,
        temparture: formatdata[i].temparture,
      });
    }
    return data
  }

  handleSoundPipeData = (dataMap) => {
    if(dataMap) {
      const { dispatch } = this.props;
      dispatch({
        type: 'soundpipe/getSoundPipeData',
        payload: {
          ...dataMap,
        },
      });
    }
  }

  handelAddData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/addSoundMetaData',
      payload: dataMap,
    });
  }

  handelUpdateData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/updateSoundMetaData',
      payload: dataMap,
    });
  }

  handelDelData = (key) => {
    const { dispatch } = this.props;
    if(_.isArray(key)) {
      dispatch({
        type: 'soundpipe/delSoundMetaList',
        payload: {pks: key},
      })
    } else {
      dispatch({
        type: 'soundpipe/delSoundMetaData',
        payload: {pk: key},
      })
    }
  }

  handelChange = (pagination, filters, sorter) => {
    if(sorter.columnKey === 'name') {
      const {soundMetaData} = this.props
      for(let i=0; i<soundMetaData.length-1; i++) {
        for(let j=0; j<soundMetaData.length-1-i; j++) {
          if(sorter.order === 'descend' ? soundMetaData[j].name>
          soundMetaData[j+1].name:soundMetaData[j].name<soundMetaData[j+1].name){
            const temp=soundMetaData[j];
            soundMetaData[j]=soundMetaData[j+1];
            soundMetaData[j+1]=temp;
        }
        }
      }
      this.setState({
        soundMetaData,
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
    const {soundMetaData, sampleData, backingData} = this.props
    let {sorter, pagination, filters} = this.state
    const {selectedRowKeys} = this.state
    sorter = sorter || {}
    pagination = pagination || {}
    filters = filters || {}
    let data = [];
    if(this.state && this.state.soundMetaData) {
      data = this.formatData(this.state.soundMetaData)
    } else {
      data = this.formatData(soundMetaData)
    }
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '16%',
        sorter: true,
        editable: false,
        sortOrder: sorter.columnKey === 'name' && sorter.order,
        // selectdata: sampleData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '样品名称',
        dataIndex: 'samplename',
        isSelect: true,
        width: '16%',
        editable: false,
        // selectdata: sampleData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '背衬',
        dataIndex: 'backingname',
        isSelect: true,
        width: '16%',
        editable: false,
        // selectdata: backingData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '压力(MPa)',
        dataIndex: 'press',
        isSelect: true,
        width: '16%',
        editable: false,
        sorter: (a, b) => a.press - b.press,
        sortOrder: sorter.columnKey === 'press' && sorter.order,
        // selectdata: [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5],
        selectdata: [],
      },
      {
        title: '温度(T/度)',
        dataIndex: 'temparture',
        isSelect: true,
        width: '16%',
        editable: false,
        sorter: (a, b) => a.temparture - b.temparture,
        sortOrder: sorter.columnKey === 'temparture' && sorter.order,
        // selectdata: [0,5,10,15,20,25,30],
        selectdata: [],
      },
    ]
    const metaContent = {
      name: '',samplename: '', backingname:'',press:'',temparture:'',
    }
    const selectMap = {'samplename': sampleData, 'backingname': backingData}
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
          type='isSound'
          catalog='smallDemo'
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
