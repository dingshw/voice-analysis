import React, { Component } from 'react'
import { Input } from 'antd'
import { connect } from 'dva';
import TestSystem from 'components/CardModel/TestSystem'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;
@connect(({ waterpot }) => ({
  bigTestSystemsData: waterpot.bigTestSystemsData,
}))
export default class TestManage extends Component {
  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/getBigTestSystemsData',
    });
  }

  // 调用action 执行后台接口更新数据
  changeData = () => {

  }

  render () {
    const { bigTestSystemsData } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isTest'
            isCreate={isCreate}
            addModal={addModal}
          />
          <Search
            placeholder="查询名称"
            enterButton="查询"
            style={{ width: 280 }}
            onSearch={this.setSearchValue}
          />
        </div>
        <div className={styles.itemLists}>
          {
            bigTestSystemsData.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <TestSystem
                  testData={item}
                  styleWidth="100%"
                  showTools={showTools}
                  keyIndex={index}
                  changeData={this.changeData}
                  delData={this.delData}
                />
              </div>
            ))
          }
        </div>
      </div>)
  }
}

