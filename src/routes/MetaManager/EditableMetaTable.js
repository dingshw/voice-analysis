import React, {Component} from 'react'
import { Table, Modal, Form, Icon, message, Button } from 'antd';
import _ from 'lodash'
import UploadFile from 'components/UploadFile/UploadFile'
import MetaManageModal from '../../components/MetaManageModal/MetaManageModal'
import EditableCell from './EditableMetaCell'
import styles from './EdittableMetaCell.less'

const EditableContext = React.createContext();
const confirm = Modal && Modal.confirm;
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

export default class EditableMetaTable extends Component {
  constructor(props) {
    super(props);
    const { columns, data, catalog, metaContent } = props
    this.state = {
      data,
      editingKey: '',
      showModal: false,
      metaContent,
     };
    this.columns = [...columns, {
      title: '操作',
      dataIndex: 'operation',
      selectdata: [],
      render: (text, record) => {
        return (
          <div style={{}}>
            <div className={styles.opertion}>
              <Icon className={styles.iconStyle} type="edit" onClick={() => this.onShowModal(record)} title="编辑" />
              <UploadFile catalog={catalog} pk={record.pk} />
              <Icon className={styles.iconStyle} type="delete" title="删除" onClick={() => this.handleDelete(record.pk)} />
            </div>
          </div>
        );
      },
    }]
  }

  onShowModal = (record) => {
    const {showModal, metaContent} = this.state
    const tempMetaContent = _.cloneDeep(metaContent)
    if(record) {
      for(const key in tempMetaContent) {
        if(Object.prototype.hasOwnProperty.call(tempMetaContent, key)) {
          tempMetaContent[key] = record[key] || ''
        }
      }
      tempMetaContent.pk = record.pk
    }
    this.setState({showModal: !showModal, metaContent: tempMetaContent})
  }

  onChangeName = (type, e) => {
    const value = e.target ? e.target.value : e
    const { metaContent } = this.state
    metaContent[type] = value
    this.setState({metaContent})
  }

  onBlurName = (value, pk) => {
    const { data } = this.props
    if(this.checkHasName(data, value, pk)) {
      return `${value} 已经存在.`
    }
    return false
  }

  setRowClassName = (record) => {
    return record.id === this.isEditing(record) ? 'clickRowStyl' : '';
  }

  checkHasName = (data, name, pk) => {
    for(const item of data) {
      if(item.name === name && item.pk !== pk) {
        return true
      }
    }
    return false
  }

  handleSelectDelete = () => {
    const that = this
    confirm({
      title: '是否确认删除?',
      content: '',
      onOk() {
        const {data} = that.state
        const {selectedRowKeys} = this.props
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
    // const { data } = this.state
    const {handelDelData} = this.props
    if(pk) {
      confirm({
        title: '是否确认删除?',
        content: '删除后元数据对应的数据都会删除',
        onOk() {
          handelDelData(pk)
        },
        onCancel() {},
      });
    } else {
      message.error('删除失败')
    }
    // const dataSource = [...data];
    // this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  isEditing = (record) => {
    const { editingKey } = this.state
    return record.key === editingKey;
  }

  cancel = () => {
    this.setState({ editingKey: '' });
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
    const { data, showModal, metaContent } = this.state
    const { selectMap, handelChange, rowSelection, filters, pagination, selectedRowKeys } = this.props
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
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{display: 'flex', marginTop: '10px',marginBottom: '10px',alignItems: 'baseline'}}>
          <div style={{marginLeft: '10px'}}>
            <Button onClick={this.onShowModal} type="primary">增加</Button>
          </div>
          <Button style={{marginLeft: '10px'}} disabled={!hasSelected} type="primary" onClick={this.handleSelectDelete}>
            批量删除
          </Button>
        </div>
        <Table
          pagination={pagination}
          rowSelection={rowSelection}
          scroll={{ y: 500 }}
          components={components}
          bordered
          size="middle"
          onChange={handelChange}
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
        {showModal ?
            (
              <MetaManageModal
                {...this.props}
                onShowModal={this.onShowModal}
                metaContent={metaContent}
                onChangeName={this.onChangeName}
                onBlurName={this.onBlurName}
                selectMap={selectMap}
              />
            ) : ''}
      </div>
    );
  }
}
