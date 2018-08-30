import React, {Component} from 'react'
import { Upload, Button, message } from 'antd'
import styles from './BasicLayout.less';

export default class UploadFile extends Component {



  render () {
    const props = {
      action: '/excelUpload/uploadExcle',
      // action: '//jsonplaceholder.typicode.com/posts/',
      multiple: false,
      withCredentials: true,
      name: 'file',
      accept: '.xlsx',
      data: { catalog: 'smallDemo' },
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
          <Button type="primary" className={styles.uploadBtn}>数据导入</Button>
        </Upload>
      </div>
    )
  }
}
