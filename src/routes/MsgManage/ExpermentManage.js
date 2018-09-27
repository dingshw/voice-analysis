import React, { Component } from 'react'
import { Input, message } from 'antd'
import { connect } from 'dva';
import ExperimentCondition from 'components/CardModel/ExperimentCondition'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;
@connect(({ scalemodel }) => ({
  testConditions: scalemodel.testConditions,
}))
export default class ExpermentManage extends Component {
  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/getTestConditions',
    });
  }

  delData = (dataModel) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/delTestConditions',
      payload: {pk: dataModel.pk},
    });
    message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, testConditions } = this.props;
    let isCreate = true
    for(const item of testConditions) {
      if(item.pk === dataModel.pk) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'scalemodel/addTestConditions',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'scalemodel/updateTestConditions',
        payload: dataModel,
      });
    }
    message.info('操作成功')
  }

  render () {
    const { testConditions } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isExperment'
            isCreate={isCreate}
            addModal={addModal}
            dataList={testConditions}
            changeData={this.changeData}
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
            testConditions.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <ExperimentCondition
                  dataList={testConditions}
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

