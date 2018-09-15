import React, {Component} from 'react'
import { connect } from 'dva';
import EditableTable from './EditableTable'

const data = [];
for (let i = 0; i < 10; i+=1) {
  data.push({
    key: i.toString(),
    sample: `阿波罗 ${i}`,
    backing: `30mm刚 ${i}`,
    press: 123 + i,
    temperatuer: 23,
    rate: '0-5k',
    refect: 12,
    transmission: 13,
    bondacust: 14,
  });
}

@connect(({ soundpipe }) => ({
  backingData: soundpipe.backingData,
  sampleData: soundpipe.sampleData,
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
  }

  render () {
    const {backingData, sampleData} = this.props
    if(sampleData.length===0 || backingData.length===0) {
      return '';
    }
    const columns = [
      {
        title: '样品名称',
        dataIndex: 'sample',
        isSelect: true,
        width: '11%',
        editable: false,
        // selectdata: sampleData.map(item=>item.name),
        selectdata: [],
      },
      {
        title: '背衬',
        dataIndex: 'backing',
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
        dataIndex: 'temperatuer',
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
    const modalDataMap = {sampleData, backingData}
    return (
      <div>
        <EditableTable columns={columns} data={data} modalDataMap={modalDataMap} />
      </div>
    )
  }
}
