import React, {Component} from 'react'
import {Modal, Button} from 'antd'
import SoundForm from '../DataFormModel/SoundForm'
import WaterForm from '../DataFormModel/WaterForm'
import ScaleForm from '../DataFormModel/ScaleForm'
import styles from './DataManageModal.less'

export default class DataManageModal extends Component {

  state = {
    visible: false,
    soundData: {
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
    const {handelAddData} = this.props
    const {soundData} = this.state
    handelAddData(soundData)
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
    const {modalDataMap, type, handelCompute} = this.props
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
            {type === 'isSound' ?
              (
                <SoundForm
                  soundData={soundData}
                  handelSoundData={this.handelSoundData}
                  handelCompute={handelCompute}
                  modalDataMap={modalDataMap}
                />
              ) : ''}
            {type === 'isWater' ? <WaterForm modalDataMap={modalDataMap} /> : ''}
            {type === 'isScale' ? <ScaleForm modalDataMap={modalDataMap} /> : ''}
          </div>
        </Modal>
      </div>
    )
  }
}