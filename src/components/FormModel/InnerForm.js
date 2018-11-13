import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;
class InnerForm extends Component{

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
          <TextArea value={dataModel.other || ''} onChange={onChangeName.bind(this, 'other')} />
        </FormItem>
      </Form>
    )
  }
}
export default InnerForm = Form.create()(InnerForm)
