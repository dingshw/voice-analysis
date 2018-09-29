import React, {Component} from 'react'
import { Table } from 'antd';

export default class MetaContent extends Component {

  onSelectChange = (dataList, selectedRowKeys) => {
    const {onChange} = this.props
    for(const key of selectedRowKeys) {
      if(dataList[key]) {
        onChange(dataList[key])
      }
    }
  }

  initColumns = (columns = {}) => {
    const columnsMap = []
    Object.keys(columns).map(key => (
      columnsMap.push({
        title: columns[key],
        dataIndex: key,
        key,
      })
    ))
    return columnsMap
  }

  initData = (data, columns) => {
    const dataList = []
    data.forEach((item, index) => {
      const colMap = {key: index, pk: item.pk}
      Object.keys(columns).forEach(key => {
        colMap[key] = item[key]
      })
      dataList.push(colMap)
    })
    return dataList
  }

  render() {
    const {columns, data, selectedRowKeys} = this.props
    const columnsList = this.initColumns(columns)
    const dataList = this.initData(data, columns)

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this, dataList),
      hideDefaultSelections: false,
      type: 'radio',
    }
    return (
      <Table rowSelection={rowSelection} columns={columnsList} dataSource={dataList} />
    )
  }
}
