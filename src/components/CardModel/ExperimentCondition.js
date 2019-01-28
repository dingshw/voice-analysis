import React, {Component} from 'react';
import { Carousel, Popconfirm, Icon, Tooltip } from 'antd'
import EditModal from './EditModal'
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class ExperimentCondition extends Component {

  onChange = () => {

  }

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
            <span className={styles.title}>{showTools? experimentData.name:'试验情况'}</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal type='isExperment' dataList={dataList} changeData={changeData} modalData={experimentData} />
                <Popconfirm title="是否要删除?" onConfirm={this.onDelete} okText="删除" cancelText="取消">
                  <Icon type="delete" className={styles.iconStyle} />
                </Popconfirm>
              </div>
            ) : ''
          }
        </div>
        {experimentData? (
          <div className={styles.cardbox}>
            <div className={`${styles.boxImg} ${styles.experimentImg}`}>
              <Carousel afterChange={this.onChange} className={styles.carousel}>
                {
                  experimentData.photos && experimentData.photos.length>0 ?
                  experimentData.photos.map(item => <div key={item.pk} className={styles.imgItem}><img src={item.url} alt="试验情况" /></div>) : <div><img src={experiment} alt="试验情况" /></div>
                }
              </Carousel>
            </div>
            <ul className={styles.itemUl}>
              <li><span>名称</span><span title={experimentData.name|| ''}>{experimentData.name || ''}</span></li>
              <li><span>时间</span><span title={experimentData.testTime|| ''}>{experimentData.testTime || ''}</span></li>
              <li><span>地点</span><span title={experimentData.testPlace|| ''}>{experimentData.testPlace || ''}</span></li>
              <li><span>水域深度</span><span title={experimentData.waterDepth|| ''}>{experimentData.waterDepth || ''}</span></li>
              <li><span>试验深度</span><span title={experimentData.testDepth|| ''}>{experimentData.testDepth || ''}</span></li>
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
