import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from "remax/wechat"
import { ConTypes } from '@/components/CustomForm/controlTypes';
import FormSearchItem from '@/components/CustomForm/FormItem/search';
import SearchForm from '@/components/SearchForm';
import useFormConfig from '@/hooks/useFormConfig';

interface searchItem {
  label?: string;
  name: string;
  component: React.PureComponent;
}

interface IProps {
  searchArr?: searchItem[];
  formCode?: string;
  // 排除的搜索项
  filter?: string[];
  onSearch: (params: any) => void;
  [index: string]: any;
}

function JgSearchForm(props: IProps) {
  const {
    formCode,
    table: { searchListConfig: controls },
    dispatch,
  } = props;

  const { tableConfig } = useFormConfig(formCode);
  // 接口有数据就用接口的，没有数据就用默认配置的
  useEffect(() => {
    dispatch({ type: 'table/searchConfig', payload: { formCode } });
  }, []);

  useEffect(
    () => {
      if (tableConfig.containers.length > 0 && controls.length === 0) {
        const searchListConfig = getSearchList(tableConfig.containers);
        if (searchListConfig.length > 0) {
          dispatch({
            type: 'table/searchListConfig',
            payload: {
              data: searchListConfig,
            },
          });
        }
      }
    },
    [tableConfig, controls]
  );

  function getForms(controls = []) {
    const { filter = [] } = props;
    // 过滤相关联无需显示的查询条件(采购里面应该先查项目，再查合同)
    const final = controls
      .filter(item => item.isSearchAble === true)
      .filter(searchItem => filter.findIndex(item => searchItem.controlCode === item) == -1);

    return getSearchItem(final);
  }

  function getSearchItem(searchForms = []) {
    return searchForms.map(data => ({
      // hide labels
      // label: data.controlLabel,
      label: '',
      // 如果是根据项目名称查询必须要传projectName，不能传projectId，select，tree这种类型就不能根据nameCode传
      name: (data.extraProps && data.extraProps.nameCode) || data.controlCode,
      component: <FormSearchItem data={data} />,
    }));
  }

  function getSearchList(containers) {
    const searchForms = containers.reduce((acc, container) => {
      const searchControls =
        (container.controls && container.controls.filter(item => item.isSearchAble === true)) || [];
      acc = acc.concat(searchControls);
      return acc;
    }, []);
    return searchForms;
  }

  // 获取时间查询参数
  function getDateParams() {
    const dataForms = controls
      .filter(item => item.controlType === ConTypes.DATEPICKER)
      .map(item => item.controlCode);
    return dataForms;
  }

  // 搜索
  function search(params) {
    const { onSearch } = props;
    const dateparams = getDateParams();
    const searchDate = {};
    dateparams.forEach(key => {
      if (params[key]) {
        searchDate[key] = [...params[key]];
        delete params[key];
      }
    });
    if (Object.keys(searchDate).length > 0) {
      params.searchDate = JSON.stringify(searchDate);
    }
    onSearch(params);
  }

  const { searchArr: defaultArr = [], style = {}, ...rest } = props;
  if (formCode && controls.length === 0) {
    return false;
  }
  const searchArr = getForms(controls);
  // 用户默认的搜索条件
  const searchData = defaultArr.concat(searchArr);
  return (
    <View style={style}>
      <SearchForm {...rest} submit={search} searchArr={searchData} />
    </View>
  );
}

export default connect(({ table, loading }) => ({
  table,
  spinning:
    loading.effects['table/searchConfig'] || loading.effects['table/saveSearchConfig'] || false,
}))(JgSearchForm);
