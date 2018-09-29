import React, {Component} from 'react'
import SoundForm from '../DataFormModel/SoundForm'
import WaterForm from '../DataFormModel/WaterForm'
import ScaleForm from '../DataFormModel/ScaleForm'
import styles from './DataManageModal.less'

export default class DataManageModal extends Component {

  state = {

  }

  render () {
    const {modalDataMap, type, handelCompute, formData, handelData} = this.props
    return (
      <div className={styles.formList}>
        {type === 'isSound' ?
          (
            <SoundForm
              soundData={formData}
              handelSoundData={handelData}
              handelCompute={handelCompute}
              modalDataMap={modalDataMap}
            />
          ) : ''}
        {type === 'isWater' ? (
          <WaterForm
            modalDataMap={modalDataMap}
            handelWaterData={handelData}
            handelCompute={handelCompute}
            waterdData={formData}
          />
        ) : ''}
        {type === 'isScale' ? (
          <ScaleForm
            modalDataMap={modalDataMap}
            handelScaleData={handelData}
            handelCompute={handelCompute}
            scaleData={formData}
          />
        ) : ''}
      </div>
    )
  }
}
