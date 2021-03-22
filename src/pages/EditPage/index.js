import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRouterConfig } from '@/models/menu';

import { useEditCom } from '@/hooks/useDetailCom';
import { Edit as BaseForm } from '@/components/CustomForm';

function Main(props) {
  // formCode与后台服务一样的名字
  const {
    dispatch,
    match: {
      params: { id },
    },
    location: {
      query: { path },
    },
  } = props;
  // ifSystemForm 0|1系统或者自定义
  const ifSystemForm = path.indexOf('usercreate') > -1;
  let route;
  if (ifSystemForm) {
    route = getRouterConfig({ name: 'usercreate' });
    const pathArr = path.split('/');
    route.formCode = pathArr[pathArr.length - 1];
    route.params = { formCode: route.formCode };
  } else {
    route = getRouterConfig({ path });
  }

  useEffect(() => {
    dispatch({
      type: 'menu/setCurRouter',
      payload: { curRouter: route },
    });
  }, [route]);

  useEffect(() => {
    // 可能是自定义表单也可能不是
    if (id && route.formCode) {
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: id,
      });
    }
  }, []);

  // formCode与后台服务一样的名字
  const { componentPath, formCode } = route;
  const { component: ChildCom } = useEditCom(componentPath);
  // 这里要考虑当前模块是否为自定义，如果不是自定义表单则用默认的组件，自定义则用通用组件
  if (route && !route.formCode) {
    route = getRouterConfig({ path: `${path}/edit/:id?` });
    return (
      <route.component {...props} />
    );
  }

  return (
    <BaseForm formCode={formCode} ISUSERCREATE={ifSystemForm}>{ChildCom}</BaseForm>
  );
}

export default connect()(Main);
