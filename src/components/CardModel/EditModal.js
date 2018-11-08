import React, { Component } from 'react'
import { Modal, Icon, Upload, Button, message } from 'antd';
import _ from 'lodash'
import request from '../../utils/request';
import SampleForm from '../FormModel/SampleForm'
import BackingForm from '../FormModel/BackingForm'
import InnerForm from '../FormModel/InnerForm'
import OuterForm from '../FormModel/OuterForm'
import ExpermentForm from '../FormModel/ExpermentForm'
import TestForm from '../FormModel/TestForm'
import LayForm from '../FormModel/LayForm'
import styles from './EditModal.less'

export default class EditModal extends Component {

  state = {
    dataModel: {},
    visible: false,
    confirmLoading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  componentWillMount () {
    let { dataModel } = this.state
    let {fileList} = this.state
    const { modalData, isCreate } = this.props
    if(isCreate) {
      dataModel = {}
    } else {
      dataModel = _.cloneDeep(modalData)
      dataModel.oldName = modalData.name
      if(dataModel.photos && dataModel.photos.length>0) {
        fileList = []
        dataModel.photos.forEach((item, index) => {
          fileList.push({
            uid: index,
            name: item.prevname || `图片${index}`,
            status: 'done',
            pk: item.pk,
            url: item.url,
          })
        });
      }
    }
    this.setState({dataModel, fileList})
  }

  componentWillReceiveProps () {
    let { dataModel } = this.state
    let {fileList} = this.state
    const { modalData, isCreate } = this.props
    if(isCreate) {
      dataModel = {}
    } else {
      dataModel = _.cloneDeep(modalData)
      dataModel.oldName = modalData.name
      if(dataModel.photos && dataModel.photos.length>0) {
        fileList = []
        dataModel.photos.forEach((item, index) => {
          fileList.push({
            uid: index,
            name: item.prevname || `图片${index}`,
            status: 'done',
            pk: item.pk,
            url: item.url,
          })
        });
      }
    }
    this.setState({dataModel, fileList})
  }

  onChangeName = (type, e) => {
    const { value } = e.target
    const { dataModel } = this.state
    const { dataList } = this.props
    if(type === 'name') {
      if(this.checkHasName(dataList, value)) {
        message.error(`${value} 已经存在，请更换其他名称.`);
        return
      }
    }
    dataModel[type] = value
    this.setState({dataModel})
  }

  onChangeDataModel = (type, unit, value) => {
    const { dataModel } = this.state
    dataModel[type] = value + unit
    this.setState({dataModel})
  }

  onRemove = (type, file) => {
    if(file.pk) {
      const { dataModel } = this.state
      if(dataModel.photos && dataModel.photos.length>0) {
        for(let i; i<dataModel.photos.length; i+=1) {
          if(dataModel.photos[i].pk === file.pk) {
            dataModel.photos.splice(i, 1)
          }
        }
      }
      this.setState({dataModel})
      request(`/photoMng/deletePhoto`, {
        method: 'POST',
        body: {pk: file.pk},
      })
      return true
    }
    }

  checkHasName = (dataList, name) => {
    for(const item of dataList) {
      if(item.name == name) {
        return true
      }
    }
    return false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const {changeData} = this.props
    const {dataModel} = this.state
    this.setState({
      visible: false,
      dataModel: {},
    });
    changeData(dataModel)
  }

  handleChange = (info) => {
    this.setState({fileList: info.fileList})
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const {dataModel} = this.state
      if(info.file.response && info.file.response.success) {
        const data = info.file.response.data || []
        if(data && data.length>0) {
          dataModel.photos = dataModel.photos && dataModel.photos.length>0 ?
            [...dataModel.photos, ...data] : data
          this.setState({dataModel})
        }
      }
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  previewCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  initInputValue = (value, unit) => {
    if(value) {
      return _.isString(value) ? value.replace(unit, '') : value
    } else {
      return ''
    }
  }

  checkBtnName = (type) => {
    switch (type) {
      case 'isSample':
        return '样品'
      case 'isBacking':
        return '背衬'
      case 'isInner':
        return '内场试验模型'
      case 'isOuter':
        return '外场试验模型'
      case 'isExperment':
        return '测试系统管理'
      case 'isTest':
        return '试验情况'
      default:
        return '敷设方案'
    }
  }

  render() {
    const { dataModel, visible, confirmLoading, previewVisible, previewImage, fileList } = this.state;
    const { addModal, isCreate, type } = this.props
    const withCredentials = true
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const typeMap = {isSample:1,isBacking:2,isInner:3,
      isOuter:4,isTest:5,isExperment:6,isLay:7}
    return (
      <div className={styles.editModal}>
        {addModal ?
          (<Button type="primary" onClick={this.showModal}>{`添加${this.checkBtnName(type)}`}</Button>) :
          (<Icon type="edit" className={styles.iconStyle} onClick={this.showModal} />)
        }
        <Modal
          title={isCreate ? "新增数据" : "编辑数据"}
          width={720}
          bodyStyle={{display: 'flex'}}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div className={`${styles.imgList} clearfix`}>
            <Upload
              key={dataModel.name}
              // action="//jsonplaceholder.typicode.com/posts/"
              action="/photoMng/uploadPhoto"
              withCredentials={withCredentials}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              onRemove={this.onRemove.bind(this, typeMap[type])}
              data={{type: typeMap[type]}}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <div className={styles.modalItem}>
            {type === 'isSample' ? (
              <SampleForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                initInputValue={this.initInputValue}
                onChangeName={this.onChangeName}
                onChangeDataModel={this.onChangeDataModel}
              />
            ) : ''}
            {type === 'isBacking' ? (
              <BackingForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                onChangeName={this.onChangeName}
              />
            ): ''}
            {type === 'isInner' ? (
              <InnerForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                onChangeName={this.onChangeName}
              />
            ): ''}
            {type === 'isOuter' ? (
              <OuterForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                onChangeName={this.onChangeName}
              />
            ): ''}
            {type === 'isExperment' ? (
              <ExpermentForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                onChangeName={this.onChangeName}
              />
            ): ''}
            {type === 'isTest' ? (
              <TestForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                onChangeName={this.onChangeName}
              />
            ): ''}
            {type === 'isLay' ? (
              <LayForm
                dataModel={dataModel}
                formItemLayout={formItemLayout}
                onChangeName={this.onChangeName}
              />
            ): ''}
          </div>
        </Modal>
      </div>
    );
  }
}
