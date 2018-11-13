import React, {Component} from 'react'
import {Form, Input} from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;
class LayForm extends Component{

  render () {

    const {dataModel, formItemLayout, onChangeName, onBlurName,form} = this.props
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="敷设方案名称"
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
          <TextArea value={dataModel.other || ''} onChange={onChangeName.bind(this, 'other')} />
        </FormItem>
      </Form>
    )
  }
}
export default LayForm = Form.create()(LayForm)
