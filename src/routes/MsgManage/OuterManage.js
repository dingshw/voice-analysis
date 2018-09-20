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

  delData = (dataModel) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/delTestModelData',
      payload: {pk: dataModel.pk},
    });
    message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, testModel } = this.props;
    let isCreate = true
    for(const item of testModel) {
      if(item.name === dataModel.oldName) {
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
            onSearch={this.setSearchValue}
          />
        </div>
        <div className={styles.itemLists}>
          {
            testModel.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name
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

