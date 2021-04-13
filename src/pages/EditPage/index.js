import React from 'react';
import { useNativeEffect } from "remax"
import { connect } from 'react-redux';

// import { useHeaderBar, useEditCom } from '@/hooks/useDetailCom';
import { useQuery } from 'remax';
// import { useEditCom } from '@/hooks/useDetailCom';
import { Edit as BaseForm } from '@/components/CustomForm';

function Main(props) {
  // formCode与后台服务一样的名字
  const {
    // jgTableModel: { item: data },
    dispatch,
  } = props;
  const { path, id, formCode } = useQuery();
  const ifSystemForm = path.indexOf('usercreate') > -1;

  // ifSystemForm 0|1系统或者自定义
  useNativeEffect(() => {
    // 可能是自定义表单也可能不是
    if (id && formCode) {
      dispatch({
        type: 'jgTableModel/queryRemote',
        payload: id,
        path
      });
    }
  }, []);

  // formCode与后台服务一样的名字
  // const { componentPath, formCode } = route;
  // const { component: ChildCom } = useEditCom(componentPath);
  // 这里要考虑当前模块是否为自定义，如果不是自定义表单则用默认的组件，自定义则用通用组件
  return (
    // <BaseForm formCode={formCode} ISUSERCREATE={ifSystemForm}>{ChildCom}</BaseForm>
    <BaseForm formCode={formCode} ISUSERCREATE={ifSystemForm} />
  );
}

export default connect()(Main);
