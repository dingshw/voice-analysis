import React, {Component} from 'react'
import {Modal} from 'antd'
import SoundForm from '../FormModel/SoundForm'
import ScaleForm from '../FormModel/ScaleForm'
import WaterForm from '../FormModel/WaterForm'

export default class MetaManageModal extends Component {

  state = {
    visible: true,
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk =()=> {
    const {handelAddData, handelUpdateData, onShowModal, metaContent} = this.props
    if(metaContent.pk) {
      handelUpdateData(metaContent)
    } else {
      handelAddData(metaContent)
    }
    onShowModal()
  }

  handleCancel = () => {
    const {onShowModal} = this.props
    onShowModal()
  }

  render () {
    const {visible} = this.state
    const {type} = this.props
    return (
      <div>
        <Modal
          title="新增数据"
          bodyStyle={{display: 'flex'}}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          <div style={{display: 'flex',flexDirection: 'column'}}>
            {type === 'isSound' && <SoundForm {...this.props} /> }
            {type === 'isScale' && <ScaleForm {...this.props} /> }
            {type === 'isWater' && <WaterForm {...this.props} /> }
          </div>
        </Modal>
      </div>
    )
  }
}
