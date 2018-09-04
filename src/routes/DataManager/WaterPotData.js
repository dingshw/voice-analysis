import React, {Component} from 'react'
import EditableTable from './EditableTable'

const data = [];
for (let i = 0; i < 10; i+=1) {
  data.push({
    key: i.toString(),
    sample: `Edrward ${i}`,
    backing: 32,
    press: `London Park no. ${i}`,
    temperatuer: `London Park no. ${i}`,
    rate: `London Park no. ${i}`,
    refect: `London Park no. ${i}`,
    transmission: `London Park no. ${i}`,
    bondacust: `London Park no. ${i}`,
    echoes: `London Park no. ${i}`,
    radiation: `London Park no. ${i}`,
    radiationlose: `London Park no. ${i}`,
  });
}
export default class WaterPotData extends Component {

  render () {

    const columns = [
      {
        title: '样品名称',
        dataIndex: 'sample',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '背衬',
        dataIndex: 'backing',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '压力',
        dataIndex: 'press',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '温度',
        dataIndex: 'temperatuer',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '频率',
        dataIndex: 'rate',
        isSelect: true,
        width: '8%',
        editable: true,
      },
      {
        title: '反射系数',
        dataIndex: 'refect',
        width: '8%',
        editable: true,
      },
      {
        title: '投射系数',
        dataIndex: 'transmission',
        width: '8%',
        editable: true,
      },
      {
        title: '吸声系数',
        dataIndex: 'bondacust',
        width: '8%',
        editable: true,
      },
      {
        title: '回声降低',
        dataIndex: 'echoes',
        width: '8%',
        editable: true,
      },
      {
        title: '辐射声功率',
        dataIndex: 'radiation',
        width: '8%',
        editable: true,
      },
      {
        title: '辐射声功率插入损失',
        dataIndex: 'radiationlose',
        width: '8%',
        editable: true,
      },
    ]
    return (
      <div>
        <EditableTable columns={columns} data={data} />
      </div>
    )
  }
}
