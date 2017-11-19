import React from 'react';
import {Link} from 'react-router';
import common from '../../../utils/common'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as breadCrumbActions from '../../../actions/BreadCrumbAction'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
import TableOperate from '../../../layout/TableOperate/TableOperate'
import TreeMenu from '../../../components/TreeMenu/TreeMenu'
import './database.less'
import {
  Button,
  Table,
  Input,
  Icon,
  Spin,
  Modal,
  Form,
  Cascader,
  Tabs,
  Menu,
  Dropdown
} from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;
const bindDBappColumns = [{
  title: '应用名称',
  dataIndex: 'appname',
  key: 'appname'
}, {
  title: '开发商',
  dataIndex: 'companyname',
  key: 'companyname'
}];

let oldEle = {}
class DataBase extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '数据库服务实例', key: '1' },
    ];

    this.state = {
      users: [],
      loading: false,
      DBData : [],
      spareDBData: [],
      DBTables: [],
      spareDBTables: [],
      tableFieldData:[],
      spareTableFieldData: [],
      modalVisible: false,
      whichModal: false,
      editText: '注册数据库服务实例',
      dbTypeList: [{
        value: 'MSSQL',
        label: 'SQL Server',
      }],
      instanceId: '',
      remark: '',
      dbname: '',
      docurl: '',
      dblabel: '',
      bindDBappList: [],
      appids: '',
      tablename: '',
      tbremark: '',
      remarkt:  '',
      isExpand: false,
      activeKey: panes[0].key,
      panes,
      dbServerList: [],
      menuInstanceId: '',
      _selectRecord: {},
      filedname: '',
      selectedRowKeys: []
    };
    this.DBTablesmenu = (
      <Menu>
        <Menu.Item>
          <Button onClick={() => this.showChildModal('remark',this.state._selectRecord)}>修改别名</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => this.showChildModal('doc',this.state._selectRecord)}>下载说明书</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => this.showChildModal('bind',this.state._selectRecord)}>绑定应用</Button>
        </Menu.Item>
      </Menu>
    );
    this.columns = [
        {
          title: '别名',
          dataIndex: 'label',
          key: 'label',
        }, {
          title: '名称',
          dataIndex: 'dbname',
          key: 'dbname'
        }, {
          title: '完整率',
          key: 'sta',
          sorter: (a, b) => a.sta - b.sta,
          render: (text,record) => <span>{record.sta + '%'}</span>
        }, {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text,record) => (
            <span className={'table-operation'}>
              <Dropdown overlay={this.DBTablesmenu}>
                <a href="#" className = 'operationTargets'>
                  操作
                  <Icon type="down"/>
                </a>
              </Dropdown>
            </span>
            )
        },
    ];
    this.DBTablesColumns = [
      {
        title: '表名称',
        dataIndex: 'tbname',
        key: 'tbname',
      }, {
        title: '表说明',
        dataIndex: 'tbremark',
        key: 'tbremark',
      }, {
        title: '完整率',
        key: 'sta',
        sorter: (a, b) => a.sta - b.sta,
        render: (text,record) => <span>{record.sta + '%'}</span>
      }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '50px',
      render: (text,record) => (
        <div>
            <Button style={{marginRight:10}}  data-key={record.key}
              onClick={this.showGrandChildModal.bind(this, 'remarkTable', record)}>修改</Button>
        </div>
        )
      },
    ];
    this.DBTablesFieldColumns = [
    {
      title: '字段名',
      dataIndex: 'field',
      key: 'field'
    }, {
      title: '字段说明',
      dataIndex: 'remarkt',
      key: 'remarkt'
    }, {
      title: '字段类型',
      dataIndex: 'type',
      key: 'type'
    }, {
      title: '主键',
      dataIndex: 'iskey',
      key: 'iskey'
    }, {
      title: '是否为空',
      dataIndex: 'isnullable',
      key: 'isnullable',
        render: (text,record) => <span>{text===1?'空':
      '非空'}</span>
    },{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '50px',
      render: (text,record) => (
        <div>
            <Button style={{marginRight:10}}  data-key={record.key}
              onClick={this.showFieldGrandChildModal.bind(this, 'remarkt', record)}>修改</Button>
        </div>
        )
      },
    ];
  }
  componentWillMount () {
    this.props.breadCrumbActions.updateBreadCrumb({
            data: ['平台资源', '数据资源']
        })
  }
  componentDidMount () {
    this.getInstanceList()
  }
  getInstanceList() {
    common.fetchDate('getInstanceList!db').then(res => {
          let menuInstanceId = sessionStorage.menuInstanceId?sessionStorage.menuInstanceId:res.body[0].instance_id
          this.getDBTree(menuInstanceId)
        this.setState({
          dbServerList:res.body,
          loading: true,
          menuInstanceId,
        })
    })
  }
  getDBTree(id) {
    common.fetchDate('getDBlistByIID!db',{
      instance_id: id
    }).then(res => {
        let arr =res.body
        for(let i = 0;i<arr.length;i++){
          arr[i].key = i+1
        }
      this.setState({
        DBData: arr,
        spareDBData: arr,
      })
    })
  }
analyzeDBTree() {
  common.fetchDate('analyzeDBTree!db').then(res => {

    let _res = res.body
      let arr = []
      for(let i = 0;i<_res.length;i++){
        arr.push({key:i+1,
          label: _res[i].label,
          dbLength:_res[i].children.length})
      }
    this.setState({
      serverData: arr,
      spareServerData: arr,
      DBData: _res,
      spareDBData: _res,
    })
  })
}
showModal(msg,instanceId) {
  this.setState({
    whichModal: false
  })
  switch(msg) {
    case 'add':
      this.setState({
        editText: '注册数据库服务实例'
      },() => {
        this.setState({
          modalVisible: true
        },() => {
          if(this.state.modalVisible) {
              this.props.form.setFieldsValue({
                name: '',
                instance_name: '',
                ip: '',
                port: '',
                account: '',
                password: '',
                dbtype: '',
                });
            }
        })
      })
    break
    case 'update':
          let that = this
          common.fetchDate('getInstance!db',{
            instance_id: instanceId,
          }).then(res => {
            let dbdata = res.body
              that.setState({
                editText: '查看数据库服务实例',
                modalVisible: true,
                instanceId: instanceId,
                users: dbdata.users
              },()=>{
                if(that.state.modalVisible) {
                  that.props.form.setFieldsValue({
                    name: dbdata.name,
                    instance_name: dbdata.instance_name,
                    ip: dbdata.ip,
                    port: dbdata.port,
                    account: dbdata.account,
                    password: dbdata.password,
                    dbtype: [dbdata.dbtype],
                    });
                }
              })
          })
    break
    case 'del':
     this.delInstance(instanceId)
    break
    default:
     return
  }
}
handleModalOk(e) {
  switch (this.state.editText) {
    case '注册数据库服务实例':
      this.addInstance(e)
    break
    case '删除数据库服务实例':
      this.delInstance()
    break
    case '查看数据库服务实例':
      this.updateInstance(e)
    break
    case '修改数据库别名':
      this.onSubmitRemark()
    break
    case '绑定数据库到应用':
      this.bindDBtoApp(e)
    break
    case '数据表说明':
      this.remarkTable(e)
    break
    case '数据字段说明':
      this.remarkField(e)
    break
    default:
      return
  }
}
handleModalCancel() {
  this.setState({
    modalVisible: false
  })
}
addInstance() {
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      let that = this
      that.setState({
        modalVisible: false,
      });
      common.fetchDate('addInstance!db',{
        name: values.name,
        instance_name: values.instance_name,
        ip: values.ip,
        port: values.port,
        account: values.account,
        password: values.password,
        dbtype: values.dbtype,
      }).then(res => {
        that.resultHint(res.body.success, res.body.message)
      })
    }
  });
}
updateInstance(e) {
  e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let that = this
        that.setState({
          modalVisible: false,
        });
        common.fetchDate('updateInstance!db',{
          instance_id: that.state.instanceId.toString(),
          name: values.name,
          instance_name: values.instance_name,
          ip: values.ip,
          port: values.port,
          account: values.account,
          password: values.password,
          dbtype: values.dbtype,
        }).then(res => {
          that.resultHint(res.body.success, res.body.message)
        })
      }
    });
}
delInstance(instanceId) {
  let that = this
  confirm({
    title: '删除确认？',
    content: `您确实要删除吗？`,
    onOk() {
      common.fetchDate('deleteInstance!db',{
        instance_id: instanceId,
      }).then(res => {
        that.resultHint(res.body.success,res.body.message)
      })
    },
    onCancel() {
    },
  });
}
showChildModal(msg,record) {
  this.setState({
    whichModal: true,
    instanceId: this.state.menuInstanceId,
    dbname: record.dbname,
    dblabel: record.label,
    remark: record.label,
    modalVisible: true,
  },() => {
    switch(msg) {
      case 'remark':
        this.setState({
          editText: '修改数据库别名',
        })
      break
      case 'doc':
        this.getDatabaseDicdoc(this.state.menuInstanceId,record.dbname)
        this.setState({
          editText: '下载数据库说明书',
        })
      break
      case 'bind':
        this.getAppListWithDBbind(this.state.instanceId,record.dbname)
        this.setState({
          editText: '绑定数据库到应用',
          modalVisible: true
        })
      break
      default:
       return
    }
  })
}
showGrandChildModal(msg,record) {
  this.setState({
    whichModal: true,
    tablename: record.tbname,
    tbremark: record.tbremark,
    modalVisible: true,
  },() => {
        this.setState({
          editText: '数据表说明',
          modalVisible: true
        })
    }
  )
}
showFieldGrandChildModal(msg,record) {
  this.setState({
    whichModal: true,
    filedname: record.field,
    remarkt: record.remarkt,
    modalVisible: true,
  },() => {
        this.setState({
          editText: '数据字段说明',
          modalVisible: true
        })
    }
  )
}
onChangeRemark(e) {
  this.setState({
    remark:e.target.value
  })
}
onChangeTextArea(e) {
  this.setState({
    tbremark: e.target.value
  })
}
onChangeFieldTextArea(e) {
  this.setState({
    remarkt: e.target.value
  })
}
onSubmitRemark() {
  let that = this
  if(this.state.remark==='') {
    return
  }
  common.fetchDate('remarkDB!db',{
    instance_id: that.state.instanceId,
    dbname: that.state.dbname,
    remark: that.state.remark
  }).then(res => {
    that.setState({
      modalVisible: false,
    });
    that.resultHint(res.body.success,res.body.message)
  })
}
selectDBTypeList() {
}
getDatabaseDicdoc(id,name) {
  let that = this
  common.fetchDate('getDatabaseDicdoc!db',{
    instance_id: id,
    dbname: name
  }).then(res => {
    if(res.body.success) {
      this.setState({
        docurl: res.body.docurl
      })
    }else {
      this.setState({
        docurl: ''
      })
    }
  })
}
generateDBDirections() {
  common.downLoad(this.state.docurl)
}
createDatabaseDicdoc() {
    let that = this
    common.fetchDate('createDatabaseDicdoc!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname
    }).then(res => {
      if(res.body.success){
        this.setState({
          docurl: res.body.docurl
        })
      }
      this.isDBDirections(res.body.success,res.body.message)
    })
}
isDBDirections(result, message) {
       if(!result) {
        let modal = Modal.error({
          content: message
        });
        setTimeout(() => modal.destroy(), 500);
      }
}
getAppListWithDBbind(id,name) {
    common.fetchDate('getAppListWithDBBind!db',{
      instance_id: id,
      dbname: name
    }).then(res => {
    let arr = res.body
    let isbinded = []
    for(let i=0;i<arr.length;i++) {
      arr[i].key = i+1
      if(arr[i].isbind === 1) {
        isbinded.push(arr[i].key)
      }
    }
      this.setState({
        bindDBappList: arr,
        selectedRowKeys: isbinded
      })
    })
}
  bindDBtoApp() {
    common.fetchDate('bindDBtoApp!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname,
      appids: this.state.appids
    }).then(res => {
      this.setState({
        modalVisible: false,
      });
      this.resultHint(res.body.success,res.body.message)
    })
  }
  analyzeDBTables(dbname) {
    // if(Object.keys(oldEle).length){
    //   oldEle.style.background = ''
    // }
    this.setState({
      instanceId: this.state.menuInstanceId,
      dbname: dbname,
      tableFieldData: [],
      spareTableFieldData: [],
    })
    common.fetchDate('analyzeDBTables!db',{
      instance_id: this.state.menuInstanceId,
      dbname: dbname,
    }).then(res => {
      let arr = res.body
      for(let i =0;i<arr.length;i++){
        arr[i].key = i + 1
      }
      this.setState({
        DBTables: arr,
        spareDBTables: arr,
      });
    })
  }
  getCurrentTableData() {
    common.fetchDate('analyzeDBTables!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname,
    }).then(res => {
      let arr = res.body
      for(let i =0;i<arr.length;i++){
        arr[i].key = i + 1
      }
      this.setState({
        DBTables: arr,
        spareDBTables: arr,
      });
    })
  }
  remarkTable() {
    common.fetchDate('remarkTable!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname,
      tablename: this.state.tablename,
      remark: this.state.tbremark
    }).then(res => {
      this.setState({
        modalVisible: false
      })
      if(res.body.success) {
        this.getCurrentTableData()
      }else {
        let modal = Modal.error({
          title: '失败',
          content: res.body.message
        });
        setTimeout(() => modal.destroy(), 1000);
      }
    })
  }

  onTableRowClick(record, index, event) {
    if(Object.keys(oldEle).length){
      oldEle.style.background = ''
    }
    let targetNode = event.target.parentNode
     targetNode.style.background = '#e2e6f0'
    oldEle = targetNode
    this.setState({
      tablename: record.tbname,
    })
    common.fetchDate('analyzeTableFields!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname,
      tbname: record.tbname
    }).then(res => {
      let arr = res.body
      for(let i =0;i<arr.length;i++){
        arr[i].key = i + 1
      }
      this.setState({
        tableFieldData: arr,
        spareTableFieldData: arr,
      });
    })
  }
  remarkField() {
    common.fetchDate('remarkField!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname,
      tablename: this.state.tablename,
      filedname: this.state.filedname,
      remark: this.state.remarkt
    }).then(res => {
      this.setState({
        modalVisible: false
      })
      if(res.body.success) {
        this.getCurrentTableFieldData()
        this.getCurrentTableData()
      }else {
        let modal = Modal.error({
          title: '失败',
          content: res.body.message
        });
        setTimeout(() => modal.destroy(), 1000);
      }
    })
  }
  getCurrentTableFieldData() {
    common.fetchDate('analyzeTableFields!db',{
      instance_id: this.state.instanceId,
      dbname: this.state.dbname,
      tbname: this.state.tablename
    }).then(res => {
      let arr = res.body
      for(let i =0;i<arr.length;i++){
        arr[i].key = i + 1
      }
      this.setState({
        tableFieldData: arr,
        spareTableFieldData: arr,
      });
    })
  }
  searchFieldName(e) {
    let value = e.target.value
    let tableArr = this.state.spareTableFieldData
    if(value !== '') {
      var arr = tableArr.filter(item => {
        return  item.field.toLowerCase().indexOf(value.trim().toLowerCase()) > -1 || (
                  item.remarkt?item.remarkt.toLowerCase().indexOf(value.trim().toLowerCase()) > -1:false
                )
      })
      this.setState({
        tableFieldData: arr
      })
    }else {
      this.setState({
        tableFieldData: this.state.spareTableFieldData
      })
    }
  }
  searchTableName(e) {
    let value = e.target.value
    let tableArr = this.state.spareDBTables
    if(value !== '') {
      var arr = tableArr.filter(item => {
        return item.tbname.toLowerCase().indexOf(value.trim().toLowerCase()) > -1 || (
          item.tbremark?item.tbremark.toLowerCase().indexOf(value.trim().toLowerCase()) > -1:false
        )
      })
      this.setState({
        DBTables: arr
      })
    }else {
      this.setState({
        DBTables: this.state.spareDBTables
      })
    }
  }
  searchDBName(e) {
      let value = e.target.value
      let tableArr = this.state.spareDBData
      if(value !== '') {
        var arr = tableArr.filter(item => {
          if(item.label) {
            return item.label.toLowerCase().indexOf(value.trim().toLowerCase()) > -1 || item.dbname.toLowerCase().indexOf(value.trim().toLowerCase()) > -1
          }
        })
        this.setState({
          DBData: arr
        })
      }else {
        this.setState({
          DBData: this.state.spareDBData
        })
      }
  }
  isExpanded(bl,record) {
    if(bl) {
      this.setState({
        serverData:[record],
        isExpand: bl
      })
    }else {
      this.setState({
          serverData: this.state.spareServerData,
          isExpand: bl
      })
    }
  }
  resultHint (result, message) {
    if(result) {
      let modal = Modal.success({
        title: '成功',
        content: message
      });
      setTimeout(() => modal.destroy(), 1000);
      this.getInstanceList()
    }else{
      let modal = Modal.error({
        title: '失败',
        content: message
      });
      setTimeout(() => modal.destroy(), 1000);
    }
  }
  onTabChange(activeKey) {
    this.setState({
      activeKey
    })
    if(activeKey !== '1') {
          this.analyzeDBTables(activeKey)
    }
  }
  onTabEdit(targetKey, action) {
    if(targetKey !== '1') {
          this[action](targetKey);
    }
  }
  addTab(title,key) {
    const panes = this.state.panes;
    let activeKey = key
    this.setState({
      activeKey
    })
    this.analyzeDBTables(activeKey)
    for(let v of panes) {
      if(v.key === key) {
        return
      }
    }
    panes.push({ title,  key });
    this.setState({ panes });
  }
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  handleMenuClick(value) {
    this.setState({
      menuInstanceId:value.key.toString()
    })
    sessionStorage.menuInstanceId = value.key.toString()
    this.getDBTree(value.key.toString())
  }
  onChildRowMouseEnter(record, index, event) {
    this.setState({
        _selectRecord: record
    })
  }
  onRowClick(record, index, event) {
    let target = event.target.getAttribute('class').indexOf('operationTargets')
    if(target == -1) {
      if(Object.keys(oldEle).length){
        oldEle.style.background = ''
      }
       event.target.parentNode.style.background = '#e2e6f0'
      oldEle = event.target.parentNode
      this.addTab(record.label,record.dbname)
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    let vModalContent = function() {
      const formItemLayout = {
         labelCol: {
           xs: { span: 6 },
           sm: { span: 6 },
         },
         wrapperCol: {
           xs: { span: 14 },
           sm: { span: 14 },
         },
       };
        return (
          <div className='clearfix'>
            <div className={this.state.editText=='注册数据库服务实例'?'': 'fl'} style={{width: this.state.editText=='注册数据库服务实例'?'100%': '60%'}}>
              <p style={{display: this.state.editText==
              '注册数据库服务实例'? 'none': 'block'}}>可修改：</p>
              <Form onSubmit={this.state.editText==='注册数据库服务实例'?this.addInstance.bind(this):this.updateInstance.bind(this)}>
                <FormItem
                  {...formItemLayout}
                  label="中文名称"
                  hasFeedback={true}
                >
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '中文名称为必填项',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="IP地址"
                  hasFeedback={true}
                >
                  {getFieldDecorator('ip', {
                    rules: [{
                      required: true, message: 'IP地址为必填项',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="端口"
                  hasFeedback={true}
                >
                  {getFieldDecorator('port', {
                    rules: [{
                      required: true, message: '端口为必填项',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="实例名"
                  hasFeedback={true}
                >
                  {getFieldDecorator('instance_name', {
                    rules: [{
                      required: true, message: '实例名为必填项',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="数据库类型"
                  hasFeedback={true}
                >
                  {getFieldDecorator('dbtype', {
                    rules: [{
                      required: true, message: '请选择数据库类型',
                    }],
                  })(
                    <Cascader placeholder="请选择" options={this.state.dbTypeList} onChange={this.selectDBTypeList.bind(this)}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="账号"
                  hasFeedback={true}
                >
                  {getFieldDecorator('account', {
                    rules: [{
                      required: true, message: '账号为必填项',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="密码"
                  hasFeedback={true}
                >
                  {getFieldDecorator('password', {
                    rules: [ {
                      required: true, message: '密码为必填项',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Form>
            </div>
              <div className={this.state.editText=='注册数据库服务实例'?'': 'fr'} style={{display: this.state.editText==
              '注册数据库服务实例'? 'none': 'block',width: '40%'}}>
              <p>登录名列表：</p>
              <ul style={{width:'100%',overflow: 'auto',maxHeight: '378px'}}>
                {
                  this.state.users.map((item,index) => <li key={index}>{item}</li>
                  )
                }
              </ul>
              </div>
          </div>
        )
    }.bind(this)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
              selectedRowKeys: selectedRowKeys
          })
          if(selectedRows.length!==0) {
            let appids = selectedRows.map((item) => {
              return item.appid
            })
            this.setState({
              appids: appids.toString()
            })
          } else {
            this.setState({
              appids: ''
            })
          }
        },
        selectedRowKeys: this.state.selectedRowKeys
        // getCheckboxProps: record => ({
        //   disabled: record.isbind === 0,    // Column configuration not to be checked
        // }),
      };
    let vChildModalContent = function(text) {
      if (text === '下载数据库说明书') {
        return (
          <div className="clearfix modalWrapper">
            <p><span>数据库：</span>{this.state.dblabel}</p>
            <p><span>下载链接：</span>
            <Button
              className='text-overflow'
              onClick={this.generateDBDirections.bind(this)}
              style={{color: this.state.docurl===''?'red':'rgb(20,118,224)'}}
              disabled={this.state.docurl===''?true:false}
              >{this.state.docurl===''?'文档不存在请先生成说明书':this.state.docurl}</Button></p>
          </div>
        )
      }
      if(text === '绑定数据库到应用') {
        return (
          <div className="modalWrapper">
            <p style={{paddingLeft: '0px'}}>{`${this.state.dblabel}由以下应用维护:`}</p>
            <Table rowSelection={rowSelection} columns={bindDBappColumns}
            pagination={false}
            dataSource={this.state.bindDBappList} />
          </div>
        )
      }
      if(text === '数据表说明') {
        return (
          <div className="modalWrapper">
            <p style={{paddingLeft: '0px'}}>{this.state.tablename}</p>
            <TextArea autosize={{ minRows: 2, maxRows: 10 }} onChange={this.onChangeTextArea.bind(this)}
            value= {this.state.tbremark}/>
          </div>
        )
      }
      if(text === '数据字段说明') {
        return (
          <div className="modalWrapper">
            <p style={{paddingLeft: '0px'}}>{this.state.filedname}</p>
            <TextArea autosize={{ minRows: 2, maxRows: 10 }} onChange={this.onChangeFieldTextArea.bind(this)}
            value= {this.state.remarkt}/>
          </div>
        )
      }
      return  (
        <div className="clearfix modalWrapper">
          <label>数据库:</label>
            <Input style={{width: '80%',marginLeft: '5%'}} defaultValue='2' value={this.state.remark}
            onChange={this.onChangeRemark.bind(this)}/>
        </div>
      )
    }.bind(this)
    let vModalFooter = function(ag,text) {
      if(ag) {
        switch(text) {
          case '修改数据库别名':
           return (
             [
                <Button key="submit" type="primary" size="large"
                  onClick={this.handleModalOk.bind(this)}
                >
                  保存
                </Button>,
              ]
           )
           break
           case '下载数据库说明书':
             return (
               [
                  <Button key="submit" type="primary" size="large"
                    onClick={this.createDatabaseDicdoc.bind(this)}
                    style={{float:'left'}}
                  >
                    生成说明书
                  </Button>,
                  <Button key="back" size="large" onClick={this.handleModalCancel.bind(this)}
                  >
                    关闭
                  </Button>
                ]
             )
             break
           case '绑定数据库到应用':
             return (
               [
                  <Button key="submit" type="primary" size="large"
                    onClick={this.handleModalOk.bind(this)}
                  >
                    保存
                  </Button>,
                ]
             )
             break
            default:
            return (
              [
                 <Button key="submit" type="primary" size="large"
                   onClick={this.handleModalOk.bind(this)}
                 >
                   保存
                 </Button>,
               ]
            )
        }
      }
      return  (
        [
           <Button key="back" size="large"
             onClick={this.handleModalCancel.bind(this)} >取消</Button>,
           <Button key="submit" type="primary" size="large"
            onClick={this.handleModalOk.bind(this)}
           >
             确定
           </Button>,
         ]
        )
    }.bind(this)
    let tabContent = function(key) {
      if(key==='1') {
        return (
          <div>
            <div className='fl serverListWrapper' style={{width: '200px', height: '720px',
              overflowY: 'auto'}}>
              <p>
                <span>
                  服务器实例列表
                </span>
              </p>
              <p style={{border: 'none'}}>
                <Button
                  type='default'
                  style={{margin: '11px 5px 0 0',border: 'none',padding: '0px'}}
                  onClick={this.showModal.bind(this, 'update',this.state.menuInstanceId)}>
                    查看
                </Button>
                <Button
                  type='default'
                  style={{margin: '11px 5px 0 0',border: 'none',padding: '0px'}}
                  onClick={this.showModal.bind(this, 'add')}>
                    新增
                </Button>
                <Button
                  type='default'
                  style={{margin: '11px 5px 0 0',border: 'none',padding: '0px'}}
                  onClick={this.showModal.bind(this, 'del',this.state.menuInstanceId)}>
                    删除
                </Button>
              </p>
              <Menu onClick={this.handleMenuClick.bind(this)}
              defaultSelectedKeys={[sessionStorage.menuInstanceId?sessionStorage.menuInstanceId:this.state.menuInstanceId.toString()]}
              mode="inline">
                {this.state.dbServerList.map((item, index) => {
                  return (
                    <Menu.Item key={item.instance_id}>{item.name}</Menu.Item>
                  )
                })
                }
              </Menu>
            </div>
            <div style={{overflow: 'hidden',paddingLeft: '10px'}}>
              <TableOperate>
                  <Search
                    className="ml10"
                     placeholder="别名/名称"
                     style={{ width: 150}}
                     onChange={this.searchDBName.bind(this)}
                   />

              </TableOperate>
              <div className="tableContent">
                <Table
                  className="components-tablechild-demo-nested"
                  columns={this.columns}
                  dataSource={this.state.DBData}
                  bordered
                  onRowMouseEnter={this.onChildRowMouseEnter.bind(this)}
                  onRowClick={this.onRowClick.bind(this)}
                />

                        <Modal
                         title={this.state.editText}
                         width={this.state.editText==
                        '查看数据库服务实例'? 700: 506}
                         visible={this.state.modalVisible}
                         onCancel={this.handleModalCancel.bind(this)}
                         footer={
                           vModalFooter(this.state.whichModal,this.state.editText)
                          }
                       >
                         {
                           this.state.whichModal
                           ?
                           vChildModalContent(this.state.editText)
                           :
                           vModalContent()
                         }
                       </Modal>
                    </div>
              </div>
            </div>
        )
      }
      return (
        <div className="dbTableWrapper">
          <div className="second">
              <div className="tableTitle">
                <span className="fl">数据表</span>
                <span className="fr">
                  <Search
                     placeholder="表名称"
                     style={{ width: 160 }}
                     onChange={this.searchTableName.bind(this)}
                   />
                </span>
              </div>
              <div className="tableBorderWrapper">
                <Table pagination={false} columns={this.DBTablesColumns} dataSource={this.state.DBTables}
                onRowClick={this.onTableRowClick.bind(this)}
                bordered/>
              </div>
          </div>
          <div className="third">
            <div className="tableTitle">
              <span className="fl">字段</span>
              <span className="fr">
                <Search
                   placeholder="字段名"
                   style={{ width: 160 }}
                   onChange={this.searchFieldName.bind(this)}
                 />
              </span>
            </div>
            <div className="tableBorderWrapper">
              {
                <Table pagination={false} columns={this.DBTablesFieldColumns} dataSource={this.state.tableFieldData}
                bordered
                />
              }
            </div>
          </div>
        </div>
      )
    }.bind(this)
    return (
      <div className="rightPage database">
        <BreadCrumb />
        {
          this.state.loading
          ?
          <div className="tableWrapper">

            <Tabs
              hideAdd
              onChange={this.onTabChange.bind(this)}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onTabEdit.bind(this)}
            >
              {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>
                {tabContent(pane.key)}
              </TabPane>)}
            </Tabs>

          </div>
          :
          <div>
            <Spin size="large" tip="Loading...">
            </Spin>
          </div>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
    return {
        BreadCrumbReducers: state.BreadCrumbReducers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        breadCrumbActions: bindActionCreators(breadCrumbActions, dispatch)
    }
}
const WrapperDataBase = Form.create()(DataBase);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrapperDataBase)
