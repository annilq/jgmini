import React from 'react';
import { connect } from 'react-redux';

import { Edit as BaseForm } from '@/components/CustomForm';
import { getRouterConfig } from '@/models/menu';
import { useEditCom } from '@/hooks/useDetailCom';

function Main(props) {
  const {
    location: {
      query: { routeName },
    },
    route,
    dispatch,
  } = props;
  const curRouter = getRouterConfig({ name: routeName });
  const { formCode } = curRouter;
  const { componentPath } = route;
  const { component: Component } = useEditCom(componentPath);
  dispatch({
    type: 'menu/setCurRouter',
    payload: { curRouter },
  });
  return <BaseForm formCode={formCode}>{Component}</BaseForm>;
}
export default connect()(Main);
