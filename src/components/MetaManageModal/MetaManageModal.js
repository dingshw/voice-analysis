import React, {Component} from 'react'
import {Modal, message} from 'antd'
import SoundForm from '../FormModel/SoundForm'
import ScaleForm from '../FormModel/ScaleForm'
import WaterForm from '../FormModel/WaterForm'

const confirm = Modal && Modal.confirm;
export default class MetaManageModal extends Component {

  state = {
    visible: true,
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk =()=> {
    const {handelAddData, handelUpdateData, onShowModal, metaContent} = this.props
    for(const key in metaContent) {
      if(key !== 'pk'
        && (metaContent[key]==='' || metaContent[key]===undefined || metaContent[key] === null)) {
        message.error('请完整相关信息')
        return ;
      }
    }
    metaContent.callBackFunc = onShowModal
    if(metaContent.pk) {
      confirm({
        title: '是否确认修改?',
        content: '修改后元数据对应的数据都会发生改变',
        onOk() {
          handelUpdateData(metaContent)
        },
        onCancel() {},
      });
    } else {
      handelAddData(metaContent)
    }
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
          width={500}
        >
          <div style={{display: 'flex',flexDirection: 'column',width: '100%'}}>
            {type === 'isSound' && <SoundForm {...this.props} /> }
            {type === 'isScale' && <ScaleForm {...this.props} /> }
            {type === 'isWater' && <WaterForm {...this.props} /> }
          </div>
        </Modal>
      </div>
    )
  }
}
