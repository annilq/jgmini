import React from 'react';

import useFormConfig from '@/hooks/useFormConfig';
import useFormCode from '@/hooks/useFormCode';
import TableList from './tableList';

interface IProps {
  title: string;
  value: any;
  extraProps: JgFormProps.SubTableExtraProps;
  observerextraprops: any;
  formdata: any;
  // 不展示在列表页的字段
  omitCols: string[]
}

function SubTableDetail(props: IProps) {
  // console.log(data, tableConfig);
  const { extraProps, observerextraprops = {}, formdata, value=[], title, omitCols, ...rest } = props;
  // 详情的value 中有版本信息
  if (!value[0]) {
    return false;
  }
  const formCode = useFormCode({
    extraProps,
    configParam: { observerextraprops, formdata, ConstantMap: {} },
  });
  const { tableConfig } = useFormConfig(
    formCode,
    value[0].exts && JSON.parse(value[0].exts)
  );

  const { containers } = tableConfig;

  return (
    <TableList
      containers={containers}
      value={value}
      omitCols={omitCols}
      {...rest}
    />
  );
}

export default SubTableDetail;
