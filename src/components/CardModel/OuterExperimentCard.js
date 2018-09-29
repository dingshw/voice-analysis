import React, {Component} from 'react';
import {Popconfirm, Icon, Tooltip, Carousel} from 'antd'
import EditModal from './EditModal'
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class OuterExperimentCard extends Component {
  onDelete = () => {
    const { experimentData, delData } = this.props
    delData(experimentData)
  }

  render () {
    const {experimentData, styleWidth, styleMarginLeft, showTools, changeData, dataList} = this.props;
    return (
      <div style={{width: styleWidth, marginLeft: styleMarginLeft}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>{showTools? experimentData.name : '试验模型'}</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal type='isOuter' dataList={dataList} changeData={changeData} modalData={experimentData} />
                <Popconfirm title="是否要删除?" onConfirm={this.onDelete} okText="删除" cancelText="取消">
                  <Icon type="delete" className={styles.iconStyle} />
                </Popconfirm>
              </div>
            ) : ''
          }
        </div>
        {experimentData? (
          <div className={styles.cardbox}>
            <div className={styles.boxImg}>
              <Carousel afterChange={this.onChange} className={styles.carousel}>
                {
                  experimentData.photos && experimentData.photos.length>0 ?
                  experimentData.photos.map(item => <div key={item.pk}><img src={item.url} alt="试验模型" /></div>) : <div><img src={experiment} alt="试验模型" /></div>
                }
              </Carousel>
            </div>
            <ul className={styles.itemUl}>
              <li><span>名称</span><span title={experimentData.name || ''}>{experimentData.name || ''}</span></li>
              <li><span>壳体类型</span><span title={experimentData.shellType || ''}>{experimentData.shellType || ''}</span></li>
              <li><span>尺寸</span><span title={experimentData.shapeSize || ''}>{experimentData.shapeSize || ''}</span></li>
              <li><span>重量</span><span title={experimentData.weight || ''}>{experimentData.weight || ''}</span></li>
              <li><span>排水量</span><span title={experimentData.displacement || ''}>{experimentData.displacement || ''}</span></li>
              <li>
                <span>其他</span>
                <Tooltip
                  placement="bottom"
                  title={experimentData.other}
                >
                  <span>{experimentData.other || ''}</span>
                </Tooltip>
              </li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
