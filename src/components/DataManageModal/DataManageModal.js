import React, {Component} from 'react'
import {Modal, Button} from 'antd'
import StepModal from './StepModal'
import styles from './DataManageModal.less'

export default class DataManageModal extends Component {

  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk =(dataMap)=> {
    const {handelAddData} = this.props
    handelAddData(dataMap)
    this.setState({visible: false})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  render () {
    const {visible} = this.state
    return (
      <div className={styles.editModal}>
        <Button onClick={this.showModal} type="primary" style={{ margin: '10px 10px 10px 0' }}>
          新增数据
        </Button>
        <Modal
          title="新增数据"
          bodyStyle={{display: 'flex'}}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={700}
        >
          <StepModal {...this.props} handleOk={this.handleOk} />
        </Modal>
      </div>
    )
  }
}
