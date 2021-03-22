import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'antd';

import Layer from '@/components/Layer';
import LayerHeader from '@/components/LayerHeader';

import SearchForm from '@/components/CustomForm/JgSearchForm';
import { flatdata } from '@/models/jgtablemodel';
import getServiceFromFormCode, { FormCodeType } from '@/components/CustomForm/FormCodeService';

import TablePicker from './table';
import styles from '@/common/styles/tableList.less';

interface record {
  id: string;
  name: string;
  [index: string]: any;
}
interface IProps extends JgFormProps.IFormProps {
  formdata: any;
  parentformdata: { formCode: string; formdata: any };
  onSelect?: (record: any) => void;
  extraProps: JgFormProps.ExtraProps;
  jgTableModel?: { item: object; editVisible: boolean };
}

interface IStates {
  selectedRows: any[];
  selectedRowKeys: number[];
  visible: boolean;
  tableLoading: boolean;
  data: any;
  [index: string]: any;
}
@connect(({ project }) => ({
  projectId: project.project.id,
}))
class Main extends PureComponent<IProps, IStates> {
  service: any;
  state = {
    selectedRows: [],
    selectedRowKeys: [],
    visible: false,
    data: {},
    tableLoading: false,
  };

  showModal = () => {
    const { extraProps } = this.props;
    const { formCode, formType } = extraProps;
    // 用户全自定义的service
    if (formType === 'fullCust') {
      // 全自定义的serveice
      this.service = getServiceFromFormCode(formCode as FormCodeType, 'USERCREATE');
      this.queryData({ formCode });
      return;
    } else {
      // 系统表单，或者自定义
      this.service = getServiceFromFormCode(formCode as FormCodeType);
      // 如果有服务就显示没有就提示
      if (this.service) {
        this.queryData();
      } else {
        console.warn(`${formCode}模块不是自定义表单生成`);
      }
      return;
    }
  };

  queryData = async (params?: any) => {
    const { projectId } = this.props;
    const paramField = this.getRequestParams();
    this.setState({ tableLoading: true, visible: true });
    // 如果是项目面板，则所有弹出框查询需要传默认项目，并且项目不可搜索
    const appCode = wx.getStorageSync('app-code');
    const response = await this.service.list({
      ...params,
      ...paramField,
      ...((appCode !== '07' && projectId && { projectId }) || {}),
      approveStatus: 'COMPLETE',
    });
    if (response) {
      const { resp: data } = response;
      const newList = data.list.map(flatdata);
      this.setState({ data: { ...data, list: newList }, tableLoading: false });
    }
  };

  // 由手写和关联组合
  getRequestParams = () => {
    const {
      extraProps: { combineField, combineMapTo, combineScope, requestParams },
      formdata,
    } = this.props;
    let paramField = {};
    // 先获取关联的查询条件
    if (combineField) {
      if (combineScope === 1) {
        paramField = { [combineMapTo || combineField]: formdata[combineField] };
      } else {
        // 默认mapto一定设置，不然还要判断多种情况
        if (this.hasRelation(combineField)) {
          const value = this.getQueryParam(combineField);
          paramField = { [combineMapTo]: value };
        }
      }
    }
    // 再获取内置的查询条件
    if (requestParams) {
      const paramsArr = requestParams.split('|');
      const defaultParams = paramsArr.reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
      }, {});
      paramField = { ...defaultParams, ...paramField };
    }

    return paramField;
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  confirm = (record: record[]) => {
    const { onChange, onSelect, extraProps } = this.props;
    const { multiple, codeKey } = extraProps;
    const ids = record.map(item => item[codeKey || 'id']).join(',');
    onChange && onChange(ids);
    // 将选择数据回传用于关联
    if (onSelect) {
      multiple ? onSelect(record.map(flatdata)) : onSelect(flatdata(record[0]));
    }
    this.handleCancel();
  };

  checkDisable = () => {
    const {
      extraProps: { combineField, combineScope },
      formdata,
    } = this.props;
    let disable = false,
      combineFieldValue;
    //如果依赖的数据没值，则不能选择 关联数据要先选择才行
    if (combineField) {
      if (combineScope === 1) {
        combineFieldValue = formdata[combineField];
      } else {
        // 作为引用表使用，combineField可能被多个表关联,取目前所在主表依赖的值
        // 并且取值从引用表单拿，而不是表单本身
        // 判断子表是否与主表关联
        if (this.hasRelation(combineField)) {
          combineFieldValue = this.getQueryParam(combineField);
        } else {
          return false;
        }
      }
      disable = !combineFieldValue;
    }
    return disable;
  };

  // 目前只支持单个查询
  getQueryParam = combineField => {
    const { parentformdata } = this.props;
    const depArr = combineField.split('|');
    let value;
    depArr.forEach(item => {
      const [formCode, fieldName] = item.split('.');
      if (formCode === parentformdata.formCode) {
        const formdata = parentformdata.formdata;
        value = formdata[fieldName];
      }
    });
    return value;
  };

  // 判断是否和主表有关联
  hasRelation = combineField => {
    const { parentformdata } = this.props;
    const depArr = combineField.split('|');
    for (let index = 0; index < depArr.length; index++) {
      const item = depArr[index];
      const formCode = item.split('.').shift();
      if (formCode === parentformdata.formCode) {
        return true;
      }
    }

    return false;
  };

  getShowName = () => {
    const {
      id,
      formdata = {},
      extraProps: { nameCode },
    } = this.props;
    // 如果表单数据有值没值则滞空，根据表单的name显示名字
    // 没有传表单数据，说明是子表使用，可以直接显示name
    // 最后根据status值显示
    if (formdata[id]) {
      const newnameCode = nameCode ? nameCode : id.replace('Id', 'Name');
      return formdata[newnameCode];
    }
    return null;
  };

  rowSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  render() {
    const {
      style,
      placeholder,
      extraProps: { multiple, combineField, formCode },
      readOnly,
      children: Children,
      parentformdata,
    } = this.props;
    const { visible, data, tableLoading, selectedRowKeys, selectedRows } = this.state;
    const name = this.getShowName();
    const disable = this.checkDisable();

    const rowSelection: any = {
      hideDefaultSelections: true,
      type: multiple ? 'checkbox' : 'radio',
      onChange: this.rowSelectionChange,
      selectedRowKeys,
    };
    const onRow = multiple
      ? null
      : record => ({
          onDoubleClick: () => {
            this.confirm([record]);
          },
        });
    return (
      <div style={style}>
        {Children ? (
          React.cloneElement(Children, { onClick: this.showModal })
        ) : (
          <Input
            // 如果有combineField值说明有依赖关联，不能让用选择
            disabled={!readOnly && !!disable}
            value={name}
            // 这个readOnly是为了样式显示
            readOnly
            onClick={readOnly ? () => {} : this.showModal}
            title={name}
            placeholder={placeholder}
            allowClear
            onChange={this.props.onChange}
            suffix={readOnly ? false : <Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />}
          />
        )}
        <Layer
          type="drawer"
          title={<LayerHeader onClose={() => this.handleCancel()} title={placeholder} />}
          width="100%"
          destroyOnClose
          visible={visible}
          onClose={() => this.handleCancel()}
          loading={false}
          closable={false}
        >
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm
                filter={[combineField]}
                loading={tableLoading}
                formCode={formCode}
                reset={() => this.queryData()}
                onSearch={params => this.queryData(params)}
                style={{ marginRight: '60px' }}
              />
            </div>
            <TablePicker
              // 在编辑基础数据时候需要用到formCode获取基础表需要的服务
              loading={tableLoading}
              formCode={formCode}
              data={data}
              onRow={onRow}
              rowSelection={rowSelection}
              onPaginationChange={params => this.queryData(params)}
              parentformdata={parentformdata}
            />
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => this.confirm(selectedRows)}>
                确定
              </Button>
              {/* <Button>取消</Button> */}
            </div>
          </div>
        </Layer>
      </div>
    );
  }
}

export default Main;
