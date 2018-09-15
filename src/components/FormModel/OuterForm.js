import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;

export default class OuterForm extends Component{

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
          label="壳体类型"
        >
          <Input
            value={dataModel.shellType || ''}
            onChange={onChangeName.bind(this, 'shellType')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="尺寸"
        >
          <Input
            value={dataModel.shapeSize || ''}
            onChange={onChangeName.bind(this, 'shapeSize')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重量"
        >
          <Input
            value={dataModel.weight || ''}
            onChange={onChangeName.bind(this, 'weight')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="排水量"
        >
          <Input
            value={dataModel.displacement || ''}
            onChange={onChangeName.bind(this, 'displacement')}
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
