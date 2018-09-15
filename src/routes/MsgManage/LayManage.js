import React, { Component } from 'react'
import { Input } from 'antd'
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

  // 调用action 执行后台接口更新数据
  changeData = () => {

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

