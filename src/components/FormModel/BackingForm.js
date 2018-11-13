import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;
class BackingForm extends Component{

  render () {

    const {dataModel, formItemLayout, onChangeName, onBlurName,form} = this.props
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="背衬名称"
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
          <TextArea value={dataModel.other || ''} onChange={onChangeName.bind(this, 'other')} />
        </FormItem>
      </Form>
    )
  }
}
export default BackingForm = Form.create()(BackingForm)
