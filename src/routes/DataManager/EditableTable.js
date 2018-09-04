import React, {Component} from 'react'
import { Table, Popconfirm, Form, Button } from 'antd';
import EditableCell from './EditableCell'
import './EdittableCell.less'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

export default class EditableTable extends Component {
  constructor(props) {
    super(props);
    const { columns, data } = props
    this.state = { data, count: data.length, editingKey: '' };
    this.columns = [...columns, {
      title: 'operation',
      dataIndex: 'operation',
      selectdata: [],
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <div>
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    </div>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <div>
                <a onClick={() => this.edit(record.key)}>Edit</a>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a href="javascript:;">Delete</a>
                </Popconfirm>
              </div>
            )}
          </div>
        );
      },
    }]
  }

  handleDelete = (key) => {
    const { data } = this.state
    const dataSource = [...data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  }

  isEditing = (record) => {
    const { editingKey } = this.state
    return record.key === editingKey;
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }


  save(form, key) {
    const { data } = this.state
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  render() {
    const { data } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.isSelect === true ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          selectdata: col.selectdata || [],
        }),
      };
    });

    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增数据
        </Button>
        <Table
          scroll={{ y: 500 }}
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </div>
    );
  }
}
