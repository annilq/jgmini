import React from 'react';
import { connect } from 'react-redux';
import useFormConfig from '@/hooks/useFormConfig';
import useFormCode from '@/hooks/useFormCode';
import TableList from './tableList';

interface IProps {
  value: any;
  extraProps: JgFormProps.SubTableExtraProps;
  observerextraprops: any;
  formdata: any;
  ConstantMap: any;
}

function maptoProps({ global }) {
  return {
    ConstantMap: global.ConstantMap,
  };
}

function SubTableDetail(props: IProps) {
  // console.log(data, tableConfig);
  const { extraProps, observerextraprops={}, formdata, ConstantMap, value, ...rest } = props;
  // 详情的value 中有版本信息
  if (!value || !value[0]) {
    return false;
  }
  // const { sysVersionId, versionId, value: listValue } = value;
  const formCode = useFormCode({
    extraProps,
    configParam: { observerextraprops, formdata, ConstantMap },
  });
  const { tableConfig, loading } = useFormConfig(
    formCode,
    value[0].exts && JSON.parse(value[0].exts),
    // 如果没有拓展字段就不取版本号
    !!value[0].exts
  );
  return (
    <TableList
      // value={value}
      containers={tableConfig.containers}
      value={value}
      loading={loading}
      {...rest}
    />
  );
}

export default connect(maptoProps)(SubTableDetail);
