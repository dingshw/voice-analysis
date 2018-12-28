import React, {Component} from 'react'
import { Upload, Button, message, Icon } from 'antd'
import styles from './UploadFile.less';

export default class UploadFile extends Component {



  render () {
    const { catalog, pk } = this.props
    const props = {
      action: '/uploadManager/uploadItems',
      // action: '//jsonplaceholder.typicode.com/posts/',
      multiple: false,
      withCredentials: true,
      name: 'file',
      accept: '.xlsx',
      data: { catalog, pk },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className={styles.toolsButton}>
        <Upload {...props} className={styles.upload}>
          {/* <Button type="primary" className={styles.uploadBtn}>数据导入</Button> */}
          <Icon className={styles.iconStyle} type="plus" title="增加数据" />
        </Upload>
      </div>
    )
  }
}
