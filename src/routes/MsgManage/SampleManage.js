import React, { Component } from 'react'
import { Input, message } from 'antd'
import { connect } from 'dva';
import SampleCard from 'components/CardModel/SampleCard'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;

@connect(({ soundpipe }) => ({
  sampleData: soundpipe.sampleData,
}))

export default class SampleManage extends Component {

  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/getSampleData',
    });
  }


  setSearchValue = (value) => {
    if(value.target && value.target.value !== undefined) {
      this.setState({searchValue: value.target.value})
    } else {
      this.setState({searchValue: value})
    }
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {
    const { dispatch, sampleData } = this.props;
    let isCreate = true
    for(const item of sampleData) {
      if(item.pk && item.pk === dataModel.pk) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'soundpipe/addSampleData',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'soundpipe/updateSampleData',
        payload: dataModel,
        isCreate,
      });
    }
    message.info('操作成功')
  }

  delData = (dataModel) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'soundpipe/delSampleData',
      payload: {pk: dataModel.pk},
    });
    message.info('操作成功')
  }

  render () {
    const { sampleData } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isSample'
            isCreate={isCreate}
            addModal={addModal}
            dataList={sampleData}
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
            sampleData.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name || (data.name && data.name.toString().includes(searchValue))
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <SampleCard
                  sampleData={item}
                  dataList={sampleData}
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

