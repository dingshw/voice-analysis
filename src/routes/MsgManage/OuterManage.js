import React, { Component } from 'react'
import { Input, message } from 'antd'
import { connect } from 'dva';
import OuterExperimentCard from 'components/CardModel/OuterExperimentCard'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;
@connect(({ scalemodel }) => ({
  testModel: scalemodel.testModel,
}))
export default class OuterManage extends Component {
  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/getTestModel',
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
      type: 'scalemodel/delTestModelData',
      payload: {pk: dataModel.pk},
    });
    // message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, testModel } = this.props;
    let isCreate = true
    for(const item of testModel) {
      if(item.pk === dataModel.pk) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'scalemodel/addTestModelData',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'scalemodel/updateTestModelData',
        payload: dataModel,
      });
    }
    message.info('操作成功')
  }

  render () {
    const { testModel } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isOuter'
            dataList={testModel}
            isCreate={isCreate}
            changeData={this.changeData}
            addModal={addModal}
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
            testModel.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name || (data.name && data.name.toString().includes(searchValue))
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <OuterExperimentCard
                  dataList={testModel}
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

