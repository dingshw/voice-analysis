import React, { Component } from 'react'
import { Modal, Icon, Upload, Form, Input, InputNumber, Button } from 'antd';
import _ from 'lodash'
import styles from './EditModal.less'

const FormItem = Form.Item;

export default class EditModal extends Component {

  state = {
    dataModel: {},
    visible: false,
    confirmLoading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },{
      uid: '2',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },{
      uid: '3',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },{
      uid: '4',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }

  componentWillMount () {
    let { dataModel } = this.state
    const { modalData, isCreate } = this.props
    if(isCreate) {
      dataModel = {}
    } else {
      dataModel = modalData
    }
    this.setState({dataModel})
  }

  componentWillReceiveProps () {
    let { dataModel } = this.state
    const { modalData, isCreate } = this.props
    if(isCreate) {
      dataModel = {}
    } else {
      dataModel = modalData
    }
    this.setState({dataModel})
  }

  onChangeName = (type, e) => {
    const { value } = e.target
    const { dataModel } = this.state
    dataModel[type] = value
    this.setState({dataModel})
  }

  onChangeDataModel = (type, value) => {
    const { dataModel } = this.state
    dataModel[type] = value
    this.setState({dataModel})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleCancel = () => {
    console.log('Clicked cancel button');
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

  render() {
    const { dataModel, visible, confirmLoading, previewVisible, previewImage, fileList } = this.state;
    const { addModal, isCreate } = this.props
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
    return (
      <div className={styles.editModal}>
        {addModal ?
          (<Button type="primary" onClick={this.showModal}>添加样品</Button>) :
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
          <div className="clearfix">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              withCredentials={withCredentials}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <div className={styles.modalItem}>
            <Form layout="inline">
              <FormItem
                {...formItemLayout}
                label="名称"
              >
                <Input value={dataModel.name || ''} onChange={this.onChangeName.bind(this, 'name')} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="密度"
              >
                <InputNumber
                  defaultValue={this.initInputValue(dataModel.density, 'kg/cm3')}
                  formatter={value => `${value}kg/cm3`}
                  parser={value => value.replace('kg/cm3', '')}
                  onChange={this.onChangeDataModel.bind(this, 'density')}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="弹性模量"
              >
                <InputNumber
                  defaultValue={this.initInputValue(dataModel.flexibleModel, 'MPa')}
                  formatter={value => `${value}MPa`}
                  parser={value => value.replace('MPa', '')}
                  onChange={this.onChangeDataModel.bind(this, 'flexibleModel')}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="泊松比"
              >
                <InputNumber
                  defaultValue={dataModel.poissonRatio || ''}
                  onChange={this.onChangeDataModel.bind(this, 'poissonRatio')}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="声速"
              >
                <InputNumber
                  defaultValue={this.initInputValue(dataModel.soundSpeed, 'm/s')}
                  formatter={value => `${value}m/s`}
                  parser={value => value.replace('m/s', '')}
                  onChange={this.onChangeDataModel.bind(this, 'soundSpeed')}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="厚度"
              >
                <InputNumber
                  defaultValue={this.initInputValue(dataModel.thickness, 'mm')}
                  formatter={value => `${value}mm`}
                  parser={value => value.replace('mm', '')}
                  onChange={this.onChangeDataModel.bind(this, 'thickness')}
                />
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
