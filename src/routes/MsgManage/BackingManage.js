import React, { Component } from 'react'
import { Input, message } from 'antd'
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
      type: 'soundpipe/delBackingData',
      payload: {pk: dataModel.pk},
    });
    message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, backingData } = this.props;
    let isCreate = true
    for(const item of backingData) {
      if(item.pk === dataModel.pk) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'soundpipe/addBackingData',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'soundpipe/updateBackingData',
        payload: dataModel,
      });
    }
    message.info('操作成功')
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
            dataList={backingData}
            addModal={addModal}
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
            backingData.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name || (data.name && data.name.toString().includes(searchValue))
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <BackingCard
                  backingData={item}
                  dataList={backingData}
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

