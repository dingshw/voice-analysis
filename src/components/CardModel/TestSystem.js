import React, {Component} from 'react'
import {Popconfirm, Icon} from 'antd'
import EditModal from './EditModal'
import styles from './index.less'
import testmodel from '../../../public/testmodel.png'

export default class TestSystem extends Component {
  onDelete = () => {
    const { testData, delData } = this.props
    delData(testData)
  }

  render () {

    const {testData, styleWidth, showTools, changeData, dataList} = this.props
    return (
      <div style={{width: styleWidth}} className={`${styles.card} ${styles.backingCard}`}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>{showTools? testData.name:'测试系统'}</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal type='isTest' dataList={dataList} changeData={changeData} modalData={testData} />
                <Popconfirm title="是否要删除?" onConfirm={this.onDelete} okText="删除" cancelText="取消">
                  <Icon type="delete" className={styles.iconStyle} />
                </Popconfirm>
              </div>
            ) : ''
          }
        </div>
        {testData? (
          <div className={styles.cardbox}>
            <div className={styles.backingBoxImg}>
              <img src={testmodel} alt="测试系统" style={{width: '100%'}} />
            </div>
            <ul className={styles.itemUl}>
              <span>测试系统介绍</span>
              <li><span>名称</span><span>{testData.name || ''}</span></li>
              <textarea className={styles.textarea} defaultValue={testData.describe || ''} />
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
