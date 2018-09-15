import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;

export default class ExpermentForm extends Component{

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
          label="时间"
        >
          <Input
            value={dataModel.testTime || ''}
            onChange={onChangeName.bind(this, 'testTime')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地点"
        >
          <Input
            value={dataModel.testPlace || ''}
            onChange={onChangeName.bind(this, 'testPlace')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="水域深度"
        >
          <Input
            value={dataModel.waterDepth || ''}
            onChange={onChangeName.bind(this, 'waterDepth')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="试验深度"
        >
          <Input
            value={dataModel.testDepth || ''}
            onChange={onChangeName.bind(this, 'testDepth')}
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
