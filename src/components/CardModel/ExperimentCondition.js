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
            <span className={styles.title}>试验情况</span>
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
                <div><img src={experiment} alt="试验情况" /></div>
                <div><img src={experiment} alt="试验情况" /></div>
                <div><img src={experiment} alt="试验情况" /></div>
                <div><img src={experiment} alt="试验情况" /></div>
                <div><img src={experiment} alt="试验情况" /></div>
              </Carousel>
            </div>
            <ul className={styles.itemUl}>
              <span>试验情况</span>
              <li><span>名称</span><span>{experimentData.name || ''}</span></li>
              <li><span>时间</span><span>{experimentData.testTime || ''}</span></li>
              <li><span>地点</span><span>{experimentData.testPlace || ''}</span></li>
              <li><span>水域深度</span><span>{experimentData.waterDepth || ''}</span></li>
              <li><span>试验深度</span><span>{experimentData.testDepth || ''}</span></li>
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
