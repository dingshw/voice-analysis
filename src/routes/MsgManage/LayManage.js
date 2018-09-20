import React, { Component } from 'react'
import { Input, message } from 'antd'
import { connect } from 'dva';
import LayingScheme from 'components/CardModel/LayingScheme'
import EditModal from 'components/CardModel/EditModal'
import styles from './index.less'

const Search = Input && Input.Search;
@connect(({ scalemodel }) => ({
  layingSchemes: scalemodel.layingSchemes,
}))
export default class LayManage extends Component {
  state = {
    searchValue: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/getLayingSchemes',
    });
  }

  delData = (dataModel) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scalemodel/delLayingSchemes',
      payload: {pk: dataModel.pk},
    });
    message.info('操作成功')
  }

  // 调用action 执行后台接口更新数据
  changeData = (dataModel) => {

    const { dispatch, layingSchemes } = this.props;
    let isCreate = true
    for(const item of layingSchemes) {
      if(item.name === dataModel.oldName) {
        isCreate = false
      }
    }
    if(isCreate) {
      dispatch({
        type: 'scalemodel/addLayingSchemes',
        payload: dataModel,
      });
    }else {
      dispatch({
        type: 'scalemodel/updateLayingSchemes',
        payload: dataModel,
      });
    }
    message.info('操作成功')
  }

  render () {
    const { layingSchemes } = this.props
    const { searchValue } = this.state
    const showTools = true
    const isCreate = true
    const addModal = true
    return (
      <div className={styles.content}>
        <div className={styles.tools}>
          <EditModal
            type='isLay'
            isCreate={isCreate}
            addModal={addModal}
            dataList={layingSchemes}
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
            layingSchemes.filter((data) => {
              if(searchValue !== '') {
                return searchValue === data.name
              }
              return data
            }).map((item, index) => (
              <div key={item.name} className={styles.item}>
                <LayingScheme
                  dataList={layingSchemes}
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

