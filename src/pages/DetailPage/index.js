import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRouterConfig } from '@/models/menu';

import { useHeaderBar, useEditCom } from '@/hooks/useDetailCom';
// import useToggleVisible from '@/hooks/useLayer';

import { Edit as BaseForm } from '@/components/CustomForm';
import Detail from './detail';
import EditBtn from './editBtn';

function Main(props) {
  // formCode与后台服务一样的名字
  // 编辑时候如果删除了流程再返回详情就不对了，这里不做历史控制了
  // const [showEdit, toggleEdit] = useToggleVisible(false)
  const [showEdit, toggleEdit] = useState(false)
  const {
    jgTableModel: { item: data },
    dispatch,
    match: {
      params: { id },
    },
    location: {
      query: { path },
    },
  } = props;
  // ifSystemForm 系统或者自定义
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
    if (id && route.formCode) {
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: id,
      });
    }
  }, []);

  // formCode与后台服务一样的名字
  const { componentPath, formCode } = route;
  const { component: EditChildCom } = useEditCom(componentPath);

  const { headerBar } = useHeaderBar(componentPath);

  // 1. 这里要考虑当前模块是否为自定义，如果不是自定义表单则用默认的组件
  // 2. 自定义组件query的数据要dispatch到jgTableModel上面EditBtn才能那得到(后面可以考虑放到route.component或者BaseForm中)
  if (route && !route.formCode) {
    route = getRouterConfig({ path: `${path}/detail/:id?` });
    return (
      <>
        <EditBtn data={data} onToggle={() => toggleEdit(!showEdit)} showEdit={showEdit} />
        <route.component {...props} />
      </>
    );
  }
  return (
    <>
      <EditBtn data={data} onToggle={() => toggleEdit(!showEdit)} showEdit={showEdit} />
      {showEdit ? <BaseForm formCode={formCode} ISUSERCREATE={ifSystemForm}>{EditChildCom}</BaseForm> : <Detail item={data} formCode={formCode} detailActions={headerBar} route={route} />}
    </>
  );
}

export default connect(({ jgTableModel }) => ({
  jgTableModel,
}))(Main);
