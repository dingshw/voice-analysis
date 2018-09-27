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
    waterdData: {
      sampleName: null,
      testModelName:null,
      testSystemName:null,
      temparture:null,
      press:null,
      refect: null,
      transmission: null,
      bondacust: null,
      rate: null,
      radiation: null,
      radiationlose: null,
      echoes: null,
    },
    scaleData: {
      testModelObjName: null,
      layingSchemeName:null,
      testConditionName:null,
      rate: null,
      lightShellTS: null,
      lightShellSP: null,
      layingShellTS: null,
      layingShellSP: null,
      reductionTS: null,
      reductionSP: null,
    },
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk =()=> {
    const {handelAddData, type} = this.props
    const {soundData, waterdData, scaleData} = this.state
    if(type === 'isSound') {
      handelAddData(soundData)
    } else if (type === 'isWater' ) {
      handelAddData(waterdData)
    } else if (type === 'isScale' ) {
      handelAddData(scaleData)
    }
    this.setState({visible: false})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  handelSoundData = (soundData) => {
    this.setState({soundData})
  }

  handelWaterData = (waterdData) => {
    this.setState({waterdData})
  }

  handelScaleData = (scaleData) => {
    this.setState({scaleData})
  }

  render () {
    const {visible, soundData, waterdData, scaleData} = this.state
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
            {type === 'isWater' ? (
              <WaterForm
                modalDataMap={modalDataMap}
                handelWaterData={this.handelWaterData}
                handelCompute={handelCompute}
                waterdData={waterdData}
              />
            ) : ''}
            {type === 'isScale' ? (
              <ScaleForm
                modalDataMap={modalDataMap}
                handelScaleData={this.handelScaleData}
                handelCompute={handelCompute}
                scaleData={scaleData}
              />
            ) : ''}
          </div>
        </Modal>
      </div>
    )
  }
}
