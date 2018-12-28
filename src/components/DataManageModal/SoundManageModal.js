import React, {Component} from 'react'
import {Modal, Button} from 'antd'
import SoundForm from '../DataFormModel/SoundForm'
import styles from './DataManageModal.less'

export default class DataManageModal extends Component {

  state = {
    visible: false,
    soundData: {
      name: null,
      samplename: null,
      backingname: null,
      press: null,
      rate: null,
      refect: null,
      temparture: null,
      transmission: null,
      bondacust: null,
    },
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk =()=> {
    const {addSoundData} = this.props
    const {soundData} = this.state
    addSoundData(soundData)
    this.setState({visible: false})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  handelSoundData = (soundData) => {
    this.setState({soundData})
  }

  render () {
    const {visible, soundData} = this.state
    const {modalDataMap, handelCompute} = this.props
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
        >
          <div className={styles.formList}>
            <SoundForm soundData={soundData} handelSoundData={this.handelSoundData} handelCompute={handelCompute} modalDataMap={modalDataMap} />
          </div>
        </Modal>
      </div>
    )
  }
}
