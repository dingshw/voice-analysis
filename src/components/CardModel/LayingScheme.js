import React, {Component} from 'react';
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class LayingScheme extends Component {

  render () {
    const {experimentData, styleWidth, styleMarginLeft} = this.props;
    return (
      <div style={{width: styleWidth, marginLeft: styleMarginLeft}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>敷设方案</span>
            <div className={styles.triangle} />
          </div>
        </div>
        {experimentData? (
          <div className={styles.cardbox}>
            <div className={styles.boxImg}>
              <img src={experiment} alt="试验模型" />
            </div>
            <ul className={styles.itemUl}>
              <li><span>敷设方案名称</span><span title={experimentData.name || ''}>{experimentData.name || ''}</span></li>
              <li><span>外壳外表面</span><span title={experimentData.shellSurfaceOuter || ''}>{experimentData.shellSurfaceOuter || ''}</span></li>
              <li><span>外壳内表面</span><span title={experimentData.shellSurfaceIner || ''}>{experimentData.shellSurfaceIner || ''}</span></li>
              <li><span>内壳</span><span title={experimentData.innerShell || ''}>{experimentData.innerShell || ''}</span></li>
              <li><span>肋骨</span><span title={experimentData.ribs || ''}>{experimentData.ribs || ''}</span></li>
              <li><span>其他</span><span title={experimentData.other || ''}>{experimentData.other || ''}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
