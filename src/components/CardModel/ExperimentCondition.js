import React, {Component} from 'react';
import { Carousel } from 'antd'
import styles from './index.less';
import experiment from '../../../public/experiment.png';

export default class ExperimentCard extends Component {

  onChange = () => {

  }

  render () {
    const {experimentData, styleWidth, styleMarginLeft} = this.props;
    return (
      <div style={{width: styleWidth, marginLeft: styleMarginLeft}} className={styles.card}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>试验情况</span>
            <div className={styles.triangle} />
          </div>
        </div>
        {experimentData? (
          <div className={styles.cardbox}>
            <div className={`${styles.boxImg} ${styles.experimentImg}`}>
              <Carousel afterChange={this.onChange} className={styles.carousel}>
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
              <li><span>其他</span><span>{experimentData.other || ''}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
