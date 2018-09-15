import React, { Component } from 'react'
import { Input } from 'antd'
import { connect } from 'dva';
import BackingCard from 'components/CardModel/BackingCard'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;
@connect(({ soundpipe }) => ({
  backingData: soundpipe.backingData,
}))
export default class BackingManage extends Component {
  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/getBackingData',
    });
  }

  // 调用action 执行后台接口更新数据
  changeData = () => {

  }

  render () {
    const { backingData } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isBacking'
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
            backingData.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <BackingCard
                  backingData={item}
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

