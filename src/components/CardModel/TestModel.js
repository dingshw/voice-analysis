import React, {Component} from 'react';
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class TestModel extends Component {

  render () {
    const {experimentData, styleWidth, styleMarginLeft} = this.props;
    return (
      <div style={{width: styleWidth, marginLeft: styleMarginLeft}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>试验模型</span>
            <div className={styles.triangle} />
          </div>
        </div>
        {experimentData? (
          <div className={styles.cardbox}>
            <div className={styles.boxImg}>
              <img src={experiment} alt="试验模型" />
            </div>
            <ul className={styles.itemUl}>
              <li><span>外场试验模型名称</span><span title={experimentData.name || ''}>{experimentData.name || ''}</span></li>
              <li><span>壳体类型</span><span title={experimentData.shellType || ''}>{experimentData.shellType || ''}</span></li>
              <li><span>尺寸</span><span title={experimentData.shapeSize || ''}>{experimentData.shapeSize || ''}</span></li>
              <li><span>重量</span><span title={experimentData.weight || ''}>{experimentData.weight || ''}</span></li>
              <li><span>排水量</span><span title={experimentData.displacement || ''}>{experimentData.displacement || ''}</span></li>
              <li><span>其他</span><span title={experimentData.other || ''}>{experimentData.other || ''}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
