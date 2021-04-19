import React, { PureComponent } from 'react';
import { Button, Popup, Cell } from 'annar';
import { View, ScrollView } from 'remax/wechat';
// import SearchForm from '@/components/CustomForm/JgSearchForm';
import { flatdata } from '@/models/jgtablemodel';
import getServiceFromFormCode, { FormCodeType } from '@/components/CustomForm/FormCodeService';

import TablePicker from './table';

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
  data: { list: any[] };
  [index: string]: any;
}

class Main extends PureComponent<IProps, IStates> {
  service: any;
  state = {
    selectedRows: [],
    selectedRowKeys: [],
    visible: false,
    data: { list: [] },
    havefetched: false,
    tableLoading: false,
    params: {},
  };

  queryData = async (params?: any) => {
    const { extraProps } = this.props;
    const { formCode, formType } = extraProps;
    const {
      data: { list },
      params: searchParam,
    } = this.state;
    let newParam = params;
    let service;
    // 用户全自定义的service
    if (formType === 'fullCust') {
      // 全自定义的serveice
      service = getServiceFromFormCode(formCode as FormCodeType, 'USERCREATE');
      newParam = { ...params, formCode };
    } else {
      // 系统表单，或者自定义
      service = getServiceFromFormCode(formCode as FormCodeType);
    }
    const paramField = this.getRequestParams();
    this.setState({ tableLoading: true });
    // 如果是项目面板，则所有弹出框查询需要传默认项目，并且项目不可搜索
    const response = await service.list({
      ...searchParam,
      ...newParam,
      ...paramField,
      approveStatus: 'COMPLETE',
    });
    if (response) {
      const { resp: data } = response;
      const newList = data.list.map(flatdata);
      this.setState({ data: { ...data, list: list.concat(newList) }, tableLoading: false, havefetched: true });
    }
  };

  searchhandle = (params = {}) => {
    this.setState({ data: { list: [] }, params }, () => {
      this.queryData();
    });
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

  showModal = () => {
    const { readOnly, formdata, id } = this.props;
    const { havefetched } = this.state
    if (!readOnly && !havefetched) {
      this.queryData();
    }
    let selectedRowKeys = [];
    if (formdata && id) {
      const value = formdata[id]
      selectedRowKeys = value ? value.split(",") : []
    }
    this.setState({ visible: true, selectedRowKeys });
  };

  confirm = (recordkeys) => {
    const { onChange, onSelect, extraProps } = this.props;
    const { multiple, codeKey } = extraProps;
    const { data: { list } } = this.state
    const ids = recordkeys.join(',');
    onChange && onChange(ids);
    // 将选择数据回传用于关联
    if (onSelect) {
      const records = recordkeys.map(item =>
        list.find(cur => cur && (cur[codeKey] === item || cur['id'] === item))
      );
      let newData;
      if (multiple) {
        newData = records.map(flatdata);
      } else {
        newData = flatdata(records[0]);
      }
      onSelect(newData);
    }
    this.handleCancel()
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
    this.setState({ selectedRowKeys });
    this.cacheSeletedData(selectedRows);
  };
  // 把所有选中过的item都缓存起来，最后统一根据selectedRowKeys过滤
  cacheSeletedData = rows => {
    const { selectedRows } = this.state;
    selectedRows.push(...rows);
    this.setState({ selectedRows });
  };

  search(params) {
    const { extraProps } = this.props;
    const { formType } = extraProps;
    let searchParams = {};
    // 用户全自定义的搜索条件和系统自定义搜索条件不一样
    if (formType === 'fullCust') {
      const paramsArr = [];
      Object.keys(params).forEach(key => {
        if (params[key] !== null && typeof params[key] !== 'undefined') {
          paramsArr.push({ [key]: params[key] });
        }
      });
      searchParams.searchParams = JSON.stringify(paramsArr);
    } else {
      searchParams = params;
    }
    this.queryData(searchParams);
  }

  loadMore = () => {
    const { data } = this.state;
    if (data.currentPage < data.totalPage) {
      this.queryData({ currentPage: data.currentPage + 1, pageSize: 10 })
    }
  }
  render() {
    const {
      style,
      placeholder,
      extraProps: { multiple, codeKey, combineField, formCode },
      readOnly,
    } = this.props;
    const { visible, data, tableLoading, selectedRowKeys } = this.state;
    const name = this.getShowName();
    const rowSelection: any = {
      hideDefaultSelections: true,
      type: multiple ? 'checkbox' : 'radio',
      onChange: this.rowSelectionChange,
      selectedRowKeys,
    };

    return (
      <View style={style}>
        <Cell.Input
          arrow
          border={false}
          label={placeholder}
          // 如果有combineField值说明有依赖关联，不能让用选择
          value={name}
          onFocus={readOnly ? () => { } : this.showModal}
        />
        <Popup
          position="right"
          square
          open={visible}
          onClose={() => {
            this.handleCancel();
          }}
          style={{ width: "100%", padding: "0 20px", height: "100%", }}
        >
          {/* <View style={{
              padding: "10px 12px",
              backgroundColor: "#f5f5f5"
            }}>
              <SearchForm
                filter={[combineField]}
                loading={tableLoading}
                formCode={formCode}
                reset={() => this.searchhandle()}
                onSearch={params => this.searchhandle(params)}
              />
            </View> */}
          <ScrollView
            scrollY
            onScrollToLower={this.loadMore}
            style={{ height: "100%", paddingBottom: 140, boxSizing: "border-box" }}
          >
            <TablePicker
              // 在编辑基础数据时候需要用到formCode获取基础表需要的服务
              loading={tableLoading}
              formCode={formCode}
              data={data}
              rowSelection={rowSelection}
            />
            <View className="actionBtns" style={{ position: "fixed" }}>
              <Button
                onTap={() => this.confirm(selectedRowKeys)}
                type="primary"
              >
                确定
                </Button>
            </View>
          </ScrollView>
        </Popup>
      </View>
    );
  }
}

export default Main;
