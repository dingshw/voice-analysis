import React, {Component} from 'react';
import styles from './index.less';
import sample from '../../../public/sample.png';

export default class SampleCard extends Component {

  render () {
    const {sampleData, styleWidth} = this.props;
    return (
      <div style={{width: styleWidth}} className={styles.card}>
        <span className={styles.title}>样品介绍</span>
        <div className={styles.triangle} />
        {sampleData? (
          <div className={styles.cardbox}>
            <div className={styles.boxImg}>
              <img src={sample} alt="样品" />
            </div>
            <ul>
              <li><span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span><span>{sampleData.name || ''}</span></li>
              <li><span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span><span>{sampleData.density || ''}</span></li>
              <li><span>弹性模量</span><span>{sampleData.flexibleModel || ''}</span></li>
              <li><span>泊&nbsp;&nbsp;松&nbsp;&nbsp;比</span><span>{sampleData.poissonRatio || ''}</span></li>
              <li><span>声&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;速</span><span>{sampleData.soundSpeed || ''}</span></li>
              <li><span>厚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</span><span>{sampleData.thickness || ''}</span></li>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
