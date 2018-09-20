import React, { Component } from 'react'
import { Input, message } from 'antd'
import { connect } from 'dva';
import InnerExperimentCard from 'components/CardModel/InnerExperimentCard'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;
@connect(({ waterpot }) => ({
  bigTestData: waterpot.bigTestData,
}))
export default class InnerManage extends Component {
  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/getBigTestData',
    });
  }

  delData = (dataModel) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'waterpot/delBigTestData',
      payload: {pk: dataModel.pk},
    });
    message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, bigTestData } = this.props;
    let isCreate = true
    for(const item of bigTestData) {
      if(item.name === dataModel.oldName) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'waterpot/addBigTestData',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'waterpot/updateBigTestData',
        payload: dataModel,
      });
    }
    message.info('操作成功')
  }

  render () {
    const { bigTestData } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isInner'
            dataList={bigTestData}
            isCreate={isCreate}
            changeData={this.changeData}
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
            bigTestData.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <InnerExperimentCard
                  dataList={bigTestData}
                  experimentData={item}
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

