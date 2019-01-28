import React, {Component} from 'react'
import {Popconfirm, Icon, Carousel, Input} from 'antd'
import EditModal from './EditModal'
import styles from './index.less'
import testmodel from '../../../public/testmodel.png'

const { TextArea } = Input;
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
              <Carousel afterChange={this.onChange} className={styles.carousel}>
                {
                  testData.photos && testData.photos.length>0 ?
                  testData.photos.map(item => <div key={item.pk} className={styles.imgItem}><img src={item.url} alt="测试系统" /></div>) : <div><img src={testmodel} alt="测试系统" /></div>
                }
              </Carousel>
            </div>
            <ul className={styles.itemUl}>
              <li><span>名称</span><span title={testData.name|| ''}>{testData.name || ''}</span></li>
              <li><span>介绍</span></li>
              <TextArea className={styles.textarea} value={testData.describe || ''} />
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
