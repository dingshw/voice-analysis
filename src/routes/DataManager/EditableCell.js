import React, {Component} from 'react'
import { Input, Form, Select } from 'antd';
import _ from 'lodash'

const Option = Select && Select.Option

const FormItem = Form.Item;
const EditableContext = React.createContext();

export default class EditableCell extends Component {
  getInput = () => {
    const {inputType, record, dataIndex, selectdata} = this.props
    if (inputType === 'select' && selectdata.length>0) {
      return (
        <Select defaultValue={record[dataIndex]}>
          {
            selectdata.map(item => {
              if(_.isObject(item)) {
                return (<Option key={item.name}>{item.name}</Option>)
              } else {
                return (<Option key={item}>{item}</Option>)
              }
            })
          }
        </Select>
      )
    }
    return (
      <Input defaultValue={record[dataIndex]} onChange={this.changeValue.bind(this, record, dataIndex)} />
    );
  };

  changeValue = (record, dataIndex, e) => {
    const {changeData} = this.props
    const value = e.target && e.target.value
    changeData(record, dataIndex, value)
  }

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {() => {
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {this.getInput()}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}


