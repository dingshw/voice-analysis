import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;
class OuterForm extends Component{

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
         <TextArea value={dataModel.other || ''} onChange={onChangeName.bind(this, 'other')} />
        </FormItem>
      </Form>
    )
  }
}
export default OuterForm = Form.create()(OuterForm)
