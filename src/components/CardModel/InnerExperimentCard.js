import React, {Component} from 'react';
import {Popconfirm, Icon, Tooltip} from 'antd'
import EditModal from './EditModal'
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class InnerExperimentCard extends Component {

  render () {
    const {experimentData, styleWidth, styleMarginLeft, showTools, changeData} = this.props;
    return (
      <div style={{width: styleWidth, marginLeft: styleMarginLeft}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>{showTools? experimentData.name:'试验模型'}</span>
            <div className={styles.triangle} />
          </div>
          {
            showTools ? (
              <div className={styles.toolsIcon}>
                {/* <Icon type="edit" className={styles.iconStyle} onClick={this.editSample} /> */}
                <EditModal type='isInner' changeData={changeData} modalData={experimentData} />
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
              <img src={experiment} alt="试验模型" />
            </div>
            <ul className={styles.itemUl}>
              <li><span>名称</span><span title={experimentData.name || ''}>{experimentData.name || ''}</span></li>
              <li><span>尺寸</span><span title={experimentData.size || ''}>{experimentData.size || ''}</span></li>
              <li><span>双层壳间距</span><span title={experimentData.doubleShellSpacing || ''}>{experimentData.doubleShellSpacing || ''}</span></li>
              <li><span>内壳厚度</span><span title={experimentData.innerShellThickness || ''}>{experimentData.innerShellThickness || ''}</span></li>
              <li><span>外壳厚度</span><span title={experimentData.shellThickness || ''}>{experimentData.shellThickness || ''}</span></li>
              <li><span>内壳后端</span><span title={experimentData.innerShellBackend || ''}>{experimentData.innerShellBackend || ''}</span></li>
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
