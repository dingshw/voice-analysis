import React, {Component} from 'react';
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class ExperimentCard extends Component {

  render () {
    const {experimentData, styleWidth, styleMarginLeft} = this.props;
    return (
      <div style={styleWidth && styleMarginLeft ? {width: styleWidth, marginLeft: styleMarginLeft} : {}} className={styles.card}>
        <div className={styles.cardTitle}>
          <span className={styles.title}>试验模型</span>
          <div className={styles.triangle} />
        </div>
        {experimentData? (
          <div className={styles.cardbox}>
            <div className={styles.boxImg}>
              <img src={experiment} alt="试验模型" />
            </div>
            <ul>
              <span>实验模型介绍</span>
              <li><span>名称</span><span>{experimentData.name || '阿波罗'}</span></li>
              <li><span>尺寸</span><span>{experimentData.density || '1.05kg/cm3'}</span></li>
              <li><span>双层壳间距</span><span>{experimentData.pa || '50MPa'}</span></li>
              <li><span>内壳厚度</span><span>{experimentData.poisson || 0.497}</span></li>
              <li><span>外壳厚度</span><span>{experimentData.voice || '1580m/s'}</span></li>
              <li><span>内壳后端</span><span>{experimentData.land || '50mm'}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
