import React, {Component} from 'react'
import { Table, Popconfirm, Form, Button, Icon, message, Select } from 'antd';
import _ from 'lodash'
import UploadFile from 'components/UploadFile/UploadFile'
import MetaManageModal from '../../components/MetaManageModal/MetaManageModal'
import EditableCell from './EditableMetaCell'
import styles from './EdittableMetaCell.less'

const EditableContext = React.createContext();
const Option = Select && Select.Option

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
      selectedRowKeys: [],
      showModal: false,
      filters: {},
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
              <UploadFile catalog={catalog} />
              <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.pk)}>
                <Icon className={styles.iconStyle} type="delete" title="删除" />
              </Popconfirm>
            </div>
          </div>
        );
      },
    }]
  }


  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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

  handleDelete = (pk) => {
    // const { data } = this.state
    const {handelDelData} = this.props
    if(pk) {
      handelDelData(pk)
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

  handleSelectDelete = () => {
    const {selectedRowKeys, data} = this.state
    const keyList = []
    for(const key of selectedRowKeys) {
      if(data[key].pk) {
        keyList.push(data[key].pk)
      }
    }
    const {handelDelData} = this.props
    if(keyList.length>0) {
      handelDelData(keyList)
    } else {
      message.error('删除失败')
    }
    // console.log('selectedRowKeys changed: ', keyList);
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

  handleChange(key, value) {
    const {filters} = this.state
    if(key === 'rate' && value && value !== '') {
      const rateMin = value.substring(0, value.indexOf('-')) * 1000
      const rateMax = value.substring(value.indexOf('-')+1, value.indexOf('k')) * 1000
      filters[key] = [rateMin, rateMax]
    } else {
      filters[key] = value
    }
    this.setState({ filters });

  }

  render() {
    const { data, selectedRowKeys, showModal, filters, metaContent } = this.state
    const { selectMap, type } = this.props
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

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{display: 'flex', marginTop: '10px',alignItems: 'baseline'}}>
          <div style={{marginLeft: '10px'}}>
            <Button onClick={this.onShowModal} type="primary">增加</Button>
          </div>
          {Object.keys(selectMap).map((key) => (
            <div key={key} style={{marginLeft: '10px'}}>
              {(key.toLowerCase() === 'samplename' && '样品名称')
                || (key === 'backingname' && '背衬名称')
                || (key === 'testModelName' && '试验模型名称')
                || (key === 'testSystemName' && '测试系统名称')
                || (key === 'testModelObjName' && '试验模型名称')
                || (key === 'testConditionName' && '试验情况名称')
                || (key === 'layingSchemeName' && '敷设方案名称')
              }
              <Select
                style={{ width: 150, marginLeft: '10px'}}
                placeholder=""
                onChange={this.handleChange.bind(this, key)}
                allowClear
              >
                {
                  selectMap[key].map(item => {
                    if(_.isObject(item)) {
                      return (<Option key={item.name}>{item.name}</Option>)
                    } else {
                      return (<Option key={item}>{item}</Option>)
                    }
                  })
                }
              </Select>
            </div>
          ))}
          <div style={{marginLeft: '10px'}}>
            压力
            <Select
              style={{ width: 100, marginLeft: '10px'}}
              onChange={this.handleChange.bind(this, 'press')}
              allowClear
            >
              {
                [0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5].map(item => {
                  if(_.isObject(item)) {
                    return (<Option key={item.name}>{item.name}</Option>)
                  } else {
                    return (<Option key={item}>{item}</Option>)
                  }
                })
              }
            </Select>
          </div>
          {
            type !== 'isScale' ?
              (
                <div style={{marginLeft: '10px'}}>
                  温度
                  <Select
                    style={{ width: 100, marginLeft: '10px'}}
                    onChange={this.handleChange.bind(this, 'temparture')}
                    allowClear
                  >
                    {
                      [0,5,10,15,20,25,30].map(item => {
                        if(_.isObject(item)) {
                          return (<Option key={item.name}>{item.name}</Option>)
                        } else {
                          return (<Option key={item}>{item}</Option>)
                        }
                      })
                    }
                  </Select>
                </div>
              ) : ''
          }
        </div>
        <Table
          rowSelection={rowSelection}
          scroll={{ y: 500 }}
          components={components}
          bordered
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
                  } else if(item[key] !== filters[key]) {
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
