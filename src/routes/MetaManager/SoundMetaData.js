import React, {Component} from 'react'
import { connect } from 'dva';
import EditableMetaTable from './EditableMetaTable'

@connect(({ soundpipe }) => ({
  soundMetaData: soundpipe.soundMetaData,
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
}))

export default class SoundMetaData extends Component {

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
    if(key) {
      dispatch({
        type: 'soundpipe/delSoundMetaData',
        payload: {pk: key},
      })
    }
  }

  render () {
    const {soundMetaData, sampleData, backingData} = this.props
    let data = [];
    data = this.formatData(soundMetaData)
    const columns = [
      {
        title: '元数据名称',
        dataIndex: 'name',
        isSelect: true,
        width: '16%',
        editable: false,
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
        // selectdata: [0,5,10,15,20,25,30],
        selectdata: [],
      },
    ]
    const metaContent = {
      name: '',samplename: '', backingname:'',press:'',temparture:'',
    }
    const selectMap = {'samplename': sampleData, 'backingname': backingData}
    return (
      <div>
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
        />
      </div>
    )
  }
}
