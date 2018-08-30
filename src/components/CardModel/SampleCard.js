import React, {Component} from 'react';
import { Icon, Popconfirm } from 'antd'
import EditModal from './EditModal'
import styles from './index.less';
import sample from '../../../public/sample.png';

export default class SampleCard extends Component {

  onDelete = () => {
    const { keyIndex, delData } = this.props
    delData(keyIndex)
  }

  render () {
    const {sampleData, styleWidth, showTools, changeData} = this.props
    return (
      <div style={{width: styleWidth}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>样品介绍</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal changeData={changeData} modalData={sampleData} />
                <Popconfirm title="是否要删除?" onConfirm={this.onDelete} okText="删除" cancelText="取消">
                  <Icon type="delete" className={styles.iconStyle} />
                </Popconfirm>
              </div>
            ) : ''
          }
        </div>
        {sampleData? (
          <div className={styles.cardbox}>
            <div className={styles.boxImg}>
              <img src={sample} alt="样品" />
            </div>
            <ul className={styles.itemUl}>
              <li><span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span><span>{sampleData.name || ''}</span></li>
              <li><span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span><span>{sampleData.density || ''}</span></li>
              <li><span>弹性模量</span><span>{sampleData.flexibleModel || ''}</span></li>
              <li><span>泊&nbsp;&nbsp;松&nbsp;&nbsp;比</span><span>{sampleData.poissonRatio || ''}</span></li>
              <li><span>声&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;速</span><span>{sampleData.soundSpeed || ''}</span></li>
              <li><span>厚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span><span>{sampleData.thickness || ''}</span></li>
              <li><span>其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他</span><span title={sampleData.other || ''}>{sampleData.other || ''}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
