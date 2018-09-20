import React, {Component} from 'react'
import { connect } from 'dva';
import EditableTable from './EditableTable'

@connect(({ soundpipe }) => ({
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
  soundPipeData: soundpipe.soundPipeData,
  soundManageData: soundpipe.soundManageData,
}))

export default class SoundData extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/getBackingData',
    });
    dispatch({
      type: 'soundpipe/getSampleData',
    });
    dispatch({
      type: 'soundpipe/getSoundManageData',
    });
  }

  formatData = (formatdata) => {
    const data = []
    for (let i=0; i<formatdata.length; i+= 1) {
      data.push({
        key: i.toString(),
        pk: formatdata[i].pk,
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
      /* {
        "samplename":"阿波罗",
        "backgroundtype":"30mm",
        "temparture":"15",
        "press":"1",
        "rateMin":"2",
        "rateMax":"100"

      } */
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
    dispatch({
      type: 'soundpipe/delSoundData',
      payload: {pk: key},
    });
  }

  render () {
    const {backingData, sampleData, soundManageData, soundPipeData} = this.props

    if(sampleData.length===0 || backingData.length===0 || soundManageData.length===0) {
      return '';
    }
    let data = [];
    data = this.formatData(soundManageData)
    const columns = [
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
        width: '11%',
        editable: false,
        sorter: (a, b) => a.press - b.press,
        // selectdata: [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5],
        selectdata: [],
      },
      {
        title: '温度(T/度)',
        dataIndex: 'temparture',
        isSelect: true,
        width: '11%',
        editable: false,
        sorter: (a, b) => a.press - b.press,
        // selectdata: [0,5,10,15,20,25,30],
        selectdata: [],
      },
      {
        title: '频率(f/Hz)',
        dataIndex: 'rate',
        isSelect: true,
        width: '11%',
        editable: false,
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
    const modalDataMap = {sampleData, backingData, soundPipeData}
    return (
      <div>
        <EditableTable
          key={data.length}
          columns={columns}
          data={data}
          modalDataMap={modalDataMap}
          type='isSound'
          handelCompute={this.handleSoundPipeData}
          handelAddData={this.handelAddData}
          handelUpdateData={this.handelUpdateData}
          handelDelData={this.handelDelData}
        />
      </div>
    )
  }
}
