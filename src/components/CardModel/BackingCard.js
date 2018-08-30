import React, {Component} from 'react'
import { Icon } from 'antd'
import styles from './index.less'

export default class BackingCard extends Component {

  render () {

    const {backingData, styleWidth, showTools} = this.props
    return (
      <div style={{width: styleWidth}} className={`${styles.card} ${styles.backingCard}`}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>背衬介绍</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                <Icon type="edit" style={{ fontSize: 16, color: '#08c', marginRight: '10px' }} />
                <Icon type="delete" style={{ fontSize: 16, color: '#08c', marginRight: '10px' }} />
              </div>
            ) : ''
          }
        </div>
        {backingData? (
          <div className={styles.cardbox}>
            <div className={styles.backingBoxImg}>
              <div className={styles.imgWater}><span>水</span></div>
              <div className={styles.imgSample}><span>样品</span></div>
              <div className={styles.imgBacking}><span>背衬</span></div>
              <div className={backingData.name === '30mm钢' ? styles.imgAir : styles.imgWater}><span>{backingData.name === '30mm钢' ? '空气' : '水'}</span></div>
            </div>
            <ul className={styles.itemUl}>
              <span>背衬基本介绍</span>
              <li><span>背衬名称</span><span>{backingData.name|| ''}</span></li>
              <li><span>样品前端介质</span><span>{backingData.frontMedium|| ''}</span></li>
              <li><span>背衬后端介质</span><span>{backingData.endMedium || ''}</span></li>
              <li><span>其他</span><span>{backingData.other|| ''}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
