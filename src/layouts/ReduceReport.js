import React, { Component } from 'react'
import { Button } from 'antd'
import html2canvas from 'html2canvas'
import styles from './BasicLayout.less';

export default class ReduceReport extends Component {

  clickToReport = () => {
    // 创建一个新的canvas
    const canvas2 = document.createElement("canvas")
    const canvasMain = document.querySelector('#indexMain')
    const stlyeClass = window.getComputedStyle(canvasMain)
    const w = parseInt(stlyeClass.width, 10)
    const h = parseInt(stlyeClass.height, 10)
    // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    const scale = 1;
    canvas2.width = w * scale;
    canvas2.height = h * scale;
    canvas2.style.width = `${w  }px`;
    canvas2.style.height = `${h  }px`;
    // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
    //  var context = canvas.getContext("2d");
    //  context.translate(0,0);
    const context = canvas2.getContext("2d");
    context.scale(2,2);
     html2canvas(canvasMain ,{canvas:canvas2}).then((canvas) => {
            // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
            const imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            // document.querySelector(".down").setAttribute('href',canvas.toDataURL());
            console.log(imgUri)
            const saveLink = document.createElement( 'a')
            saveLink.href =imgUri
            saveLink.download = 'report.png';
            saveLink.click();
     });
  }

  render () {
    return (
      <Button
        type="primary"
        className={styles.toolsButton}
        onClick={this.clickToReport}
      >
        生成报告
      </Button>
    )
  }
}
