import React, {Component} from 'react'
import styles from './index.less'
import testmodel from '../../../public/testmodel.png'

export default class TestSystem extends Component {

  render () {

    const {testData, styleWidth} = this.props
    return (
      <div style={{width: styleWidth}} className={`${styles.card} ${styles.backingCard}`}>
        <div className={styles.cardTitle}>
          <span className={styles.title}>测试系统</span>
          <div className={styles.triangle} />
        </div>
        {testData? (
          <div className={styles.cardbox}>
            <div className={styles.backingBoxImg}>
              <img src={testmodel} alt="测试系统" />
            </div>
            <ul>
              <span>测试系统介绍</span>
              <li><span>名称</span><span>阿波罗</span></li>
              <textarea className={styles.textarea}>2331231231312233123123131223312312313122331231231312</textarea>
            </ul>
          </div>): ''
        }
      </div>
    )
  }
}
