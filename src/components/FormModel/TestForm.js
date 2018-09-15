import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;

export default class TestForm extends Component{

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
          label="介绍"
        >
          <textarea defaultValue={dataModel.describe || ''} />
        </FormItem>
      </Form>
    )
  }
}
