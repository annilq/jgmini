import React from 'react';

import { getRouterConfig } from '@/models/menu';

// import { useDetailCom } from '@/hooks/useDetailCom';
import Detail from '@/components/CustomForm/detail/combine';

interface IProps {
  formCode: string;
  [index: string]: any;
}

function DetailPage(props: IProps) {
  const { formCode, route, ...rest } = props;
  // const curRouter = route || getRouterConfig({ formCode });
  // const { component: Component } = useDetailCom();
  // if (!Component) {
  //   return false
  // }
  return (
    <Detail formCode={formCode} {...rest} />
  );
}

export default DetailPage;
