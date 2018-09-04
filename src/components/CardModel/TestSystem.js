import React, {Component} from 'react'
import styles from './index.less'
import testmodel from '../../../public/testmodel.png'

export default class TestSystem extends Component {

  render () {

    const {testData, styleWidth} = this.props
    return (
      <div style={{width: styleWidth}} className={`${styles.card} ${styles.backingCard}`}>
        <div className={styles.cardTitle}>
          <div>
            <span className={styles.title}>测试系统</span>
            <div className={styles.triangle} />
          </div>
        </div>
        {testData? (
          <div className={styles.cardbox}>
            <div className={styles.backingBoxImg}>
              <img src={testmodel} alt="测试系统" style={{width: '100%'}} />
            </div>
            <ul className={styles.itemUl}>
              <span>测试系统介绍</span>
              <li><span>名称</span><span>{testData.name || ''}</span></li>
              <textarea className={styles.textarea} value={testData.describe || ''} />
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
