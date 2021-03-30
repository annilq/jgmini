import React from 'react';
import { useNativeEffect } from "remax"
import { connect } from 'react-redux';

// import { useHeaderBar, useEditCom } from '@/hooks/useDetailCom';
import { getConfigFormPath, getConfigFormFormCode } from '@/components/CustomForm/routerConfig'
import { useQuery } from 'remax';

// import { Edit as BaseForm } from '@/components/CustomForm';
import DetailActions from '@/components/LayerHeader/detailActions';
import Detail from './detail';
// import EditBtn from './editBtn';

function Main(props) {
  // formCode与后台服务一样的名字
  // 编辑时候如果删除了流程再返回详情就不对了，这里不做历史控制了
  // const [showEdit, toggleEdit] = useState(false)
  const {
    jgTableModel: { item: data },
    dispatch,
  } = props;
  const { formCode, id } = useQuery();
  useNativeEffect(() => {
    dispatch({
      type: 'jgTableModel/queryRemote',
      payload: { id },
      formCode
    });

  }, []);

  // formCode与后台服务一样的名字
  // const { componentPath, formCode } = route;
  // const { component: EditChildCom } = useEditCom(componentPath);

  // const { headerBar } = useHeaderBar(componentPath);

  // 1. 这里要考虑当前模块是否为自定义，如果不是自定义表单则用默认的组件
  // 2. 自定义组件query的数据要dispatch到jgTableModel上面EditBtn才能那得到(后面可以考虑放到route.component或者BaseForm中)
  // if (route && !route.formCode) {
  //   route = getRouterConfig({ path: `${path}/detail/:id?` });
  //   return (
  //     <>
  //       <EditBtn data={data} onToggle={() => toggleEdit(!showEdit)} showEdit={showEdit} />
  //       <route.component {...props} />
  //     </>
  //   );
  // }
  console.log(data);
  return (
    <>
      {/* <EditBtn data={data} onToggle={() => toggleEdit(!showEdit)} showEdit={showEdit} /> */}
      {/* {showEdit ? <BaseForm formCode={formCode} ISUSERCREATE={ifSystemForm}>{EditChildCom}</BaseForm> : <Detail item={data} formCode={formCode} detailActions={headerBar} route={route} />} */}
      <Detail item={data} formCode={formCode} detailActions={DetailActions} />
    </>
  );
}

export default connect(({ jgTableModel }) => ({
  jgTableModel,
}))(Main);
