import React, {Component} from 'react'
import { connect } from 'dva';
import EditableTable from './EditableTable'

const data = [];
for (let i = 0; i < 10; i+=1) {
  data.push({
    key: i.toString(),
    sample: `阿波罗 ${i}`,
    backing: 32,
    press: `London Park no. ${i}`,
    temperatuer: `London Park no. ${i}`,
    rate: `London Park no. ${i}`,
    refect: `London Park no. ${i}`,
    transmission: `London Park no. ${i}`,
    bondacust: `London Park no. ${i}`,
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
    const columns = [
      {
        title: '样品名称',
        dataIndex: 'sample',
        isSelect: true,
        width: '11%',
        editable: true,
        selectdata: sampleData,
      },
      {
        title: '背衬',
        dataIndex: 'backing',
        isSelect: true,
        width: '11%',
        editable: true,
        selectdata: backingData,
      },
      {
        title: '压力',
        dataIndex: 'press',
        isSelect: true,
        width: '11%',
        editable: true,
        selectdata: [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5],
      },
      {
        title: '温度',
        dataIndex: 'temperatuer',
        isSelect: true,
        width: '11%',
        editable: true,
        selectdata: [0,5,10,15,20,25,30],
      },
      {
        title: '频率',
        dataIndex: 'rate',
        isSelect: true,
        width: '11%',
        editable: true,
        selectdata: ['0-5k','5-10k','10-15k','15-20k','20-25k','25-30k'],
      },
      {
        title: '反射系数',
        dataIndex: 'refect',
        width: '11%',
        editable: true,
        selectdata: [],
      },
      {
        title: '投射系数',
        dataIndex: 'transmission',
        width: '11%',
        editable: true,
        selectdata: [],
      },
      {
        title: '吸声系数',
        dataIndex: 'bondacust',
        width: '11%',
        editable: true,
        selectdata: [],
      },
    ]
    return (
      <div>
        <EditableTable columns={columns} data={data} />
      </div>
    )
  }
}
