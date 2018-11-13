import React, {Component} from 'react'
import { Table, Popconfirm, Form, Button, Icon, message, Select } from 'antd';
import _ from 'lodash'
import DataManageModal from '../../components/DataManageModal/DataManageModal'
import EditableCell from './EditableCell'
import styles from './EdittableCell.less'

const EditableContext = React.createContext();
const Option = Select && Select.Option

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
      selectedRowKeys: [],
      showModal: false,
      filters: {},
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
                <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.pk)}>
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

  setRowClassName = (record) => {
    return record.id === this.isEditing(record) ? 'clickRowStyl' : '';
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
    const { data, selectedRowKeys, showModal, filters } = this.state
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
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{display: 'flex', marginTop: '10px',alignItems: 'baseline'}}>

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
          {
            type !== 'isScale' ? (
              <div style={{marginLeft: '10px'}}>
                频率
                <Select
                  style={{ width: 100, marginLeft: '10px'}}
                  onChange={this.handleChange.bind(this, 'rate')}
                  allowClear
                >
                  {
                    ['0-1k','1-3k','3-10k','10-30k'].map(item => {
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
        {showModal? '':''}
        <div style={{display: 'flex', alignItems: 'baseline'}}>
          <DataManageModal
            {...this.props}
          />
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
                  } else if(item[key] != filters[key]) {
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
