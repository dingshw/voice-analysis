import React, {Component} from 'react'
import {Modal, Button,  Form, Select, Input} from 'antd'
import styles from './DataManageModal.less'

const FormItem = Form.Item;
const Option = Select && Select.Option

export default class DataManageModal extends Component {

  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleOk =()=> {
    this.setState({visible: false})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  render () {
    const {visible} = this.state
    const {modalDataMap} = this.props
    const {sampleData, backingData} = modalDataMap
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
            <Form layout="horizontal" className={styles.dataForm}>
              <div className={styles.leftForm}>
                <FormItem
                  {...formItemLayout}
                  label="样品名称"
                >
                  <Select>
                    {
                      sampleData && sampleData.map(item => {
                        if(_.isObject(item)) {
                          return (<Option key={item.name}>{item.name}</Option>)
                        } else {
                          return (<Option key={item}>{item}</Option>)
                        }
                      })
                    }
                  </Select>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="背衬名称"
                >
                  <Select>
                    {
                      backingData && backingData.map(item => {
                        if(_.isObject(item)) {
                          return (<Option key={item.name}>{item.name}</Option>)
                        } else {
                          return (<Option key={item}>{item}</Option>)
                        }
                      })
                    }
                  </Select>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="压力(MPa)"
                >
                  <Select>
                    {
                      [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5].map(item => {
                        if(_.isObject(item)) {
                          return (<Option key={item.name}>{item.name}</Option>)
                        } else {
                          return (<Option key={item}>{item}</Option>)
                        }
                      })
                    }
                  </Select>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="温度(T/度)"
                >
                  <Select>
                    {
                      [0,5,10,15,20,25,30].map(item => {
                        if(_.isObject(item)) {
                          return (<Option key={item.name}>{item.name}</Option>)
                        } else {
                          return (<Option key={item}>{item}</Option>)
                        }
                      })
                    }
                  </Select>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="频率(f/Hz)"
                >
                  <Select>
                    {
                      ['0-5k','5-10k','10-15k','15-20k','20-25k','25-30k'].map(item => {
                        if(_.isObject(item)) {
                          return (<Option key={item.name}>{item.name}</Option>)
                        } else {
                          return (<Option key={item}>{item}</Option>)
                        }
                      })
                    }
                  </Select>
                </FormItem>
              </div>
              <div className={styles.centerForm}>
                <Button type="primary">计算</Button>
              </div>
              <div className={styles.rightForm}>
                <FormItem
                  {...formItemLayout}
                  label="反射系数"
                >
                  <Input />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="透射系数"
                >
                  <Input />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="吸声系数"
                >
                  <Input />
                </FormItem>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
