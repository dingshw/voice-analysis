import React, { Component } from 'react'
import { Input, message } from 'antd'
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

  setSearchValue = (value) => {
    if(value.target && value.target.value !== undefined) {
      this.setState({searchValue: value.target.value})
    } else {
      this.setState({searchValue: value})
    }
  }

  delData = (dataModel) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/delBigTestSystemsData',
      payload: dataModel,
    });
    // message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, bigTestSystemsData } = this.props;
    let isCreate = true
    for(const item of bigTestSystemsData) {
      if(item.pk === dataModel.pk) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'waterpot/addBigTestSystemsData',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'waterpot/updateBigTestSystemsData',
        payload: dataModel,
      });
    }
    message.info('操作成功')
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
            dataList={bigTestSystemsData}
            changeData={this.changeData}
          />
          <Search
            placeholder="查询名称"
            enterButton="查询"
            style={{ width: 280 }}
            onChange={this.setSearchValue}
            onSearch={this.setSearchValue}
          />
        </div>
        <div className={styles.itemLists}>
          {
            bigTestSystemsData.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name || (data.name && data.name.toString().includes(searchValue))
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <TestSystem
                  dataList={bigTestSystemsData}
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

