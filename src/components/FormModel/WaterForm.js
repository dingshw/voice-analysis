import React, {Component} from 'react'
import _ from 'lodash'
import {Form, Input, Select} from 'antd'

const FormItem = Form.Item;
const Option = Select && Select.Option
class WaterForm extends Component{
  render () {
    const {metaContent, onChangeName,onBlurName, form, selectMap} = this.props
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    return (
      <Form layout="inline">
        <FormItem
          {...formItemLayout}
          label="元数据名称"
        >
          {getFieldDecorator('name', {
            initialValue: metaContent.name,
            rules: [{
              required: true, message: '名称不能为空',
            },
              (rule, value, callback) => {
                const flag = onBlurName(value,metaContent.pk)
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
        {Object.keys(selectMap).map((key) => (
          <FormItem
            key={key}
            required
            {...formItemLayout}
            label={(key.toLowerCase() === 'samplename' && '样品名称')
              || (key === 'backingname' && '背衬名称')
              || (key === 'testModelName' && '试验模型名称')
              || (key === 'testSystemName' && '测试系统名称')
              || (key === 'testModelObjName' && '试验模型名称')
              || (key === 'testConditionName' && '试验情况名称')
              || (key === 'layingSchemeName' && '敷设方案名称')
            }
          >
            <Select
              placeholder=""
              value={metaContent[key]}
              onChange={onChangeName.bind(this, key)}
              allowClear
            >
              {
                selectMap[key].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name} title={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item} title={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </FormItem>
        ))}
        <FormItem
          {...formItemLayout}
          label="压力"
          required
        >
          <Input
            onChange={onChangeName.bind(this, 'press')}
            value={metaContent.press}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="温度"
          required
        >
          <Input
            onChange={onChangeName.bind(this, 'temparture')}
            value={metaContent.temparture}
          />
        </FormItem>
      </Form>
    )
  }
}
export default WaterForm = Form.create()(WaterForm)
