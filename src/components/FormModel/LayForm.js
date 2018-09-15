import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;

export default class LayForm extends Component{

  render () {

    const {dataModel, formItemLayout, onChangeName} = this.props
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="敷设方案名称"
        >
          <Input value={dataModel.name || ''} onChange={onChangeName.bind(this, 'name')} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="外壳外表面"
        >
          <Input
            value={dataModel.shellSurfaceOuter || ''}
            onChange={onChangeName.bind(this, 'shellSurfaceOuter')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="外壳内表面"
        >
          <Input
            value={dataModel.shellSurfaceIner || ''}
            onChange={onChangeName.bind(this, 'shellSurfaceIner')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内壳"
        >
          <Input
            value={dataModel.innerShell || ''}
            onChange={onChangeName.bind(this, 'innerShell')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="肋骨"
        >
          <Input
            value={dataModel.ribs || ''}
            onChange={onChangeName.bind(this, 'ribs')}
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
