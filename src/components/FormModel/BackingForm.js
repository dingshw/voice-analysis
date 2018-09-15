import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;

export default class BackingForm extends Component{

  render () {

    const {dataModel, formItemLayout, onChangeName} = this.props
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="背衬名称"
        >
          <Input value={dataModel.name || ''} onChange={onChangeName.bind(this, 'name')} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="样品前端介质"
        >
          <Input
            value={dataModel.frontMedium || ''}
            onChange={onChangeName.bind(this, 'frontMedium')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="背衬后端介质"
        >
          <Input
            value={dataModel.endMedium || ''}
            onChange={onChangeName.bind(this, 'endMedium')}
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
