import React, {Component} from 'react'
import { Table, Form, Icon, message, Modal } from 'antd';
import _ from 'lodash'
import EditableCell from './EditableCell'
import styles from './EdittableCell.less'

const EditableContext = React.createContext();
const confirm = Modal && Modal.confirm
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
      editingKey: '',
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
                      <a style={{ marginRight: 8 }} onClick={() => this.cancel(record.key)}>取消</a>
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record)}
                      >
                        保存
                      </a>
                    </div>
                  )}
                </EditableContext.Consumer>
              </span>
            ) : (
              <div className={styles.opertion}>
                <Icon className={styles.iconStyle} type="edit" onClick={() => this.edit(record.key)} />
                <Icon className={styles.iconStyle} type="delete" onClick={() => this.handleDelete(record.pk)} />
              </div>
            )}
          </div>
        );
      },
    }]
  }

  setRowClassName = (record) => {
    return record.id === this.isEditing(record) ? 'clickRowStyl' : '';
  }

  isEditing = (record) => {
    const { editingKey } = this.state
    return record.key === editingKey;
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  }



  handleSelectDelete = () => {
    const that = this
    confirm({
      title: '是否确认删除?',
      content: '',
      onOk() {
        const {selectedRowKeys, data} = that.state
        const keyList = []
        for(const key of selectedRowKeys) {
          if(data[key].pk) {
            keyList.push(data[key].pk)
          }
        }
        const {handelDelData} = that.props
        if(keyList.length>0) {
          handelDelData(keyList)
        } else {
          message.error('删除失败')
        }
      },
      onCancel() {},
    });
    // console.log('selectedRowKeys changed: ', keyList);
  }

  handleDelete = (pk) => {
    const that = this
    confirm({
      title: '是否确认删除?',
      content: '',
      onOk() {
        // const { data } = this.state
        const {handelDelData} = that.props
        if(pk) {
          handelDelData(pk)
        } else {
          message.error('删除失败')
        }
      },
      onCancel() {},
    });

    // const dataSource = [...data];
    // this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  handelDataChange = (record, dataIndex, value) => {
    const {data} = this.state
    for(const item of data) {
      if(item.key === record.key) {
        item[dataIndex] = !_.isNaN(Number(value)) ? Number(value) : value
      }
    }
    this.setState({data})
  }

  save(form, record) {
    const {handelUpdateData} = this.props
    handelUpdateData(record)
    this.setState({editingKey: '' });
  }


  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const { data } = this.state
    const { handelChange, pagination, filters, rowSelection } = this.props
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
          changeData: this.handelDataChange,
        }),
      };
    });
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          pagination={pagination}
          scroll={{ y: 500 }}
          components={components}
          bordered
          onChange={handelChange}
          size="middle"
          dataSource={_.isEmpty(filters) ? data : data.filter(item => {
            let isEqule = true
            for(const key in filters) {
              if(Object.prototype.hasOwnProperty.call(filters, key)) {
                if(item[key] && filters[key] && filters[key] !== '') {
                  if(key === 'rate') {
                    if(item[key] < filters[key][0] || item[key] > filters[key][1]) {
                      isEqule = false
                    }
                  } else if(key === 'name' && item[key].toString().indexOf(filters[key])===-1) {
                    isEqule = false
                  } else if(key !== 'name' && item[key] != filters[key]) {
                    isEqule = false
                  }
                }
              }
            }
            return isEqule
          })}
          columns={columns}
          rowClassName={this.setRowClassName}
        />
      </div>
    );
  }
}
