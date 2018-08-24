import React, {Component} from 'react'
import styles from './index.less'
import backing from '../../../public/backing.svg'

export default class BackingCard extends Component {

  render () {

    const {backingData, styleWidth} = this.props
    return (
      <div style={{width: styleWidth}} className={`${styles.card} ${styles.backingCard}`}>
        <div className={styles.cardTitle}>
          <span className={styles.title}>背衬介绍</span>
          <div classNamse={styles.triangle} />
        </div>
        {backingData? (
          <div className={styles.cardbox}>
            <div className={styles.backingBoxImg}>
              <div className={styles.imgWater}><span>水</span></div>
              <div className={styles.imgSample}><span>样品</span></div>
              <div className={styles.imgBacking}><span>{backingData.name}</span></div>
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
