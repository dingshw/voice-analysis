import React, {Component} from 'react'
import {Form, Input, InputNumber} from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;
class SampleForm extends Component{
  render () {
    const {dataModel, formItemLayout, initInputValue, onChangeName, onChangeDataModel,onBlurName, form} = this.props
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
            <Input
              onChange={onChangeName.bind(this, 'name')}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密度"
        >
          <InputNumber
            defaultValue={initInputValue(dataModel.density, 'kg/cm3')}
            formatter={value => `${value}kg/cm3`}
            parser={value => value.replace('kg/cm3', '')}
            onChange={onChangeDataModel.bind(this, 'density', 'kg/cm3')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="弹性模量"
        >
          <InputNumber
            defaultValue={initInputValue(dataModel.flexibleModel, 'MPa')}
            formatter={value => `${value}MPa`}
            parser={value => value.replace('MPa', '')}
            onChange={onChangeDataModel.bind(this, 'flexibleModel', 'MPa')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="泊松比"
        >
          <InputNumber
            defaultValue={dataModel.poissonRatio || ''}
            onChange={onChangeDataModel.bind(this, 'poissonRatio', '')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="声速"
        >
          <InputNumber
            defaultValue={initInputValue(dataModel.soundSpeed, 'm/s')}
            formatter={value => `${value}m/s`}
            parser={value => value.replace('m/s', '')}
            onChange={onChangeDataModel.bind(this, 'soundSpeed', 'm/s')}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="厚度"
        >
          <InputNumber
            defaultValue={initInputValue(dataModel.thickness, 'mm')}
            formatter={value => `${value}mm`}
            parser={value => value.replace('mm', '')}
            onChange={onChangeDataModel.bind(this, 'thickness', 'mm')}
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
export default SampleForm = Form.create()(SampleForm)
