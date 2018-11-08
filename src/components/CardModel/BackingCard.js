import React, {Component} from 'react'
import { Icon, Popconfirm, Tooltip, Carousel } from 'antd'
import EditModal from './EditModal'
import styles from './index.less'

export default class BackingCard extends Component {

  onDelete = () => {
    const { backingData, delData } = this.props
    delData(backingData)
  }

  render () {

    const {backingData, styleWidth, showTools, changeData} = this.props
    return (
      <div style={{width: styleWidth}} className={`${styles.card} ${styles.backingCard}`}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>{showTools?backingData.name: '背衬介绍' }</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal type='isBacking' changeData={changeData} modalData={backingData} />
                <Popconfirm title="是否要删除?" onConfirm={this.onDelete} okText="删除" cancelText="取消">
                  <Icon type="delete" className={styles.iconStyle} />
                </Popconfirm>
              </div>
            ) : ''
          }
        </div>
        {backingData? (
          <div className={styles.cardbox}>
            {
              backingData.photos && backingData.photos.length>0 ?
              (
                <div className={`${styles.boxImg} ${styles.experimentImg}`}>
                  <Carousel afterChange={this.onChange} className={styles.carousel}>
                    {
                      backingData.photos.map(item => <div key={item.pk} className={styles.imgItem}><img src={item.url} alt="背衬" /></div>)
                    }
                  </Carousel>
                </div>
              )
            :
              (
                <div className={styles.backingBoxImg}>
                  <div className={styles.imgWater}><span>水</span></div>
                  <div className={styles.imgSample}><span>样品</span></div>
                  <div className={styles.imgBacking}><span>背衬</span></div>
                  <div className={backingData.name && backingData.name.includes('30mm钢') ? styles.imgAir : styles.imgWater}><span>{backingData.name && backingData.name.includes('30mm钢') ? '空气' : '水'}</span></div>
                </div>
              )
            }
            <ul className={styles.backingItemUl}>
              <span>背衬基本介绍</span>
              <li><span>背衬名称</span><span>{backingData.name|| ''}</span></li>
              <li><span>样品前端介质</span><span>{backingData.frontMedium|| ''}</span></li>
              <li><span>背衬后端介质</span><span>{backingData.endMedium || ''}</span></li>
              <li>
                <span>其他</span>
                <Tooltip
                  placement="bottom"
                  title={backingData.other}
                >
                  <span>{backingData.other || ''}</span>
                </Tooltip>
              </li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
