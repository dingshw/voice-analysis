import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;

class ExpermentForm extends Component{

  render () {

    const {dataModel, formItemLayout, onChangeName, onBlurName,form} = this.props
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {getFieldDecorator('name', {
            initialValue: dataModel.name,
            rules: [{
              required: true, message: '名称不能为空',
            },
              (rule, value, callback) => {
                const flag = onBlurName(value,dataModel.pk)
                if(flag) {
                  callback(flag);
                }
                if(value.length > 15) {
                  callback('名称最长为15个字符');
                }
                callback();
              },
            ],
          },
          {
            validator: this.validateToName,
          }
          )(
            <Input onChange={onChangeName.bind(this, 'name')} />
          )}
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
          <TextArea value={dataModel.other || ''} onChange={onChangeName.bind(this, 'other')} />
        </FormItem>
      </Form>
    )
  }
}
export default ExpermentForm = Form.create()(ExpermentForm)
