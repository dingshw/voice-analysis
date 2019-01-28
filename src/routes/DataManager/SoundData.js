import React, {Component} from 'react'
import { connect } from 'dva';
import { Select, Input } from 'antd';
import _ from 'lodash'
import EditableTable from './EditableTable'
import styles from './EdittableCell.less'

const Option = Select && Select.Option
@connect(({ soundpipe }) => ({
  soundPipeData: soundpipe.soundPipeData,
  soundManageData: soundpipe.soundManageData,
  soundMetaData: soundpipe.soundMetaData,
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
}))

export default class SoundData extends Component {

  state = {
    sorter: null,
    showModal: false,
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
    dispatch({
      type: 'soundpipe/getSoundManageData',
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
        backingname: formatdata[i].backingname,
        press: formatdata[i].press,
        rate: formatdata[i].rate,
        refect: formatdata[i].refect,
        temparture: formatdata[i].temparture,
        transmission: formatdata[i].transmission,
        bondacust: formatdata[i].bondacust,
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
      type: 'soundpipe/addSoundData',
      payload: dataMap,
    });
  }

  handelUpdateData = (dataMap) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/updateSoundData',
      payload: dataMap,
    });
  }

  handelDelData = (key) => {
    const { dispatch } = this.props;
    if(_.isArray(key)) {
      dispatch({
        type: 'soundpipe/delSoundDataList',
        payload: {pks: key},
      })
    } else {
      dispatch({
        type: 'soundpipe/delSoundData',
        payload: {pk: key},
      })
    }
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
      const {soundManageData} = this.props
      for(let i=0; i<soundManageData.length-1; i++) {
        for(let j=0; j<soundManageData.length-1-i; j++) {
          if(this.sortName(sorter.order, soundManageData[j], soundManageData[j+1])){
            const temp=soundManageData[j];
            soundManageData[j]=soundManageData[j+1];
            soundManageData[j+1]=temp;
        }
        }
      }
      this.setState({
        soundManageData,
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
    const {soundManageData, soundPipeData, soundMetaData, sampleData, backingData} = this.props
    let {sorter, filters, pagination} = this.state
    const {showModal} = this.state
    sorter = sorter || {}
    filters = filters || {}
    pagination = pagination || {}
    let data = [];
    if(this.state && this.state.soundManageData) {
      data = this.formatData(this.state.soundManageData)
    } else {
      data = this.formatData(soundManageData)
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
        title: '样品名称',
        dataIndex: 'samplename',
        isSelect: true,
        width: '11%',
        editable: false,
        // selectdata: sampleData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '背衬',
        dataIndex: 'backingname',
        isSelect: true,
        width: '11%',
        editable: false,
        // selectdata: backingData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '压力(MPa)',
        dataIndex: 'press',
        isSelect: true,
        width: '10%',
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
        width: '10%',
        editable: false,
        sorter: (a, b) => a.temparture - b.temparture,
        sortOrder: sorter.columnKey === 'temparture' && sorter.order,
        // selectdata: [0,5,10,15,20,25,30],
        selectdata: [],
      },
      {
        title: '频率(f/Hz)',
        dataIndex: 'rate',
        isSelect: true,
        width: '10%',
        editable: false,
        sorter: (a, b) => a.rate - b.rate,
        sortOrder: sorter.columnKey === 'rate' && sorter.order,
        // selectdata: ['0-5k','5-10k','10-15k','15-20k','20-25k','25-30k'],
        selectdata: [],
      },
      {
        title: '反射系数',
        dataIndex: 'refect',
        width: '9%',
        editable: true,
        selectdata: [],
      },
      {
        title: '透射系数',
        dataIndex: 'transmission',
        width: '9%',
        editable: true,
        selectdata: [],
      },
      {
        title: '吸声系数',
        dataIndex: 'bondacust',
        width: '9%',
        editable: true,
        selectdata: [],
      },
    ]
    const modalDataMap = {soundPipeData}
    const selectMap = {'samplename': sampleData, 'backingname': backingData}
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
          metaData={soundMetaData}
          type='isSound'
          handelCompute={this.handleSoundPipeData}
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
