import React, {Component} from 'react'
import { Table, Popconfirm, Form, Button, Icon } from 'antd';
import DataManageModal from '../../components/DataManageModal/DataManageModal'
import EditableCell from './EditableCell'
import styles from './EdittableCell.less'

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
    this.state = {
      data,
      count: data.length,
      editingKey: '',
      selectedRowKeys: [],
      showModal: false,
     };
    this.columns = [...columns, {
      title: '操作',
      dataIndex: 'operation',
      selectdata: [],
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div style={{}}>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <div className={styles.saveBtn}>
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    </div>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确定取消?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
              <div className={styles.opertion}>
                <Icon className={styles.iconStyle} type="edit" onClick={() => this.edit(record.key)} />
                <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
                  <Icon className={styles.iconStyle} type="delete" />
                </Popconfirm>
              </div>
            )}
          </div>
        );
      },
    }]
  }


  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  handleDelete = (key) => {
    const { data } = this.state
    const dataSource = [...data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    // const { count, data } = this.state;
    // const newData = {
    //   key: count,
    // };
    // this.setState({
    //   data: [newData, ...data],
    //   count: count + 1,
    // });
    this.setState({showModal: true})
  }

  isEditing = (record) => {
    const { editingKey } = this.state
    return record.key === editingKey;
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  }



  handleSelectDelete = () => {
    const {selectedRowKeys} = this.state
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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


  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const { data, selectedRowKeys, showModal } = this.state
    const {modalDataMap} = this.props
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

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        {showModal? '':''}
        <div style={{display: 'flex', alignItems: 'baseline'}}>
          <DataManageModal modalDataMap={modalDataMap} />
          <Popconfirm title="确定删除?" onConfirm={this.handleSelectDelete}>
            <Button disabled={!hasSelected} type="primary" style={{ marginBottom: 10 }}>
              批量删除
            </Button>
          </Popconfirm>
        </div>
        <Table
          rowSelection={rowSelection}
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
