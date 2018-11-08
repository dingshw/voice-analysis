import React, {Component} from 'react';
import { Icon, Popconfirm, Tooltip, Carousel } from 'antd'
import EditModal from './EditModal'
import styles from './index.less';
import sample from '../../../public/sample.png';

export default class SampleCard extends Component {

  onDelete = () => {
    const { sampleData, delData } = this.props
    delData(sampleData)
  }

  render () {
    const {sampleData, styleWidth, showTools, changeData, dataList} = this.props
    return (
      <div style={{width: styleWidth}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>{showTools ? sampleData.name : '样品介绍'}</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal
                  type='isSample'
                  changeData={changeData}
                  modalData={sampleData}
                  dataList={dataList}
                />
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
              <Carousel afterChange={this.onChange} className={styles.carousel}>
                {
                  sampleData.photos && sampleData.photos.length>0 ?
                  sampleData.photos.map(item => <div key={item.pk} className={styles.imgItem}><img src={item.url} alt="样品" /></div>) : <div><img src={sample} alt="样品" /></div>
                }
              </Carousel>
            </div>
            <ul className={styles.itemUl}>
              <li><span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span><span title={sampleData.name || ''}>{sampleData.name || ''}</span></li>
              <li><span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span><span title={sampleData.density || ''}>{sampleData.density || ''}</span></li>
              <li><span>弹性模量</span><span title={sampleData.flexibleModel || ''}>{sampleData.flexibleModel || ''}</span></li>
              <li><span>泊&nbsp;&nbsp;松&nbsp;&nbsp;比</span><span title={sampleData.poissonRatio || ''}>{sampleData.poissonRatio || ''}</span></li>
              <li><span>声&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;速</span><span title={sampleData.soundSpeed || ''}>{sampleData.soundSpeed || ''}</span></li>
              <li><span>厚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span><span title={sampleData.thickness || ''}>{sampleData.thickness || ''}</span></li>
              <li>
                <span>其&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他</span>
                <Tooltip
                  placement="bottom"
                  title={sampleData.other}
                >
                  <span>{sampleData.other || ''}</span>
                </Tooltip>
              </li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
