import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;

export default class InnerForm extends Component{

  render () {

    const {dataModel, formItemLayout, onChangeName} = this.props
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          <Input value={dataModel.name || ''} onChange={onChangeName.bind(this, 'name')} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="尺寸"
        >
          <Input
            value={dataModel.size || ''}
            onChange={onChangeName.bind(this, 'size')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="双层壳间距"
        >
          <Input
            value={dataModel.doubleShellSpacing || ''}
            onChange={onChangeName.bind(this, 'doubleShellSpacing')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内壳厚度"
        >
          <Input
            value={dataModel.innerShellThickness || ''}
            onChange={onChangeName.bind(this, 'innerShellThickness')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="外壳厚度"
        >
          <Input
            value={dataModel.shellThickness || ''}
            onChange={onChangeName.bind(this, 'shellThickness')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内壳后端"
        >
          <Input
            value={dataModel.innerShellBackend || ''}
            onChange={onChangeName.bind(this, 'innerShellBackend')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="其他"
        >
          <Input
            value={dataModel.other || ''}
            onChange={onChangeName.bind(this, 'other')}
          />
        </FormItem>
      </Form>
    )
  }
}
