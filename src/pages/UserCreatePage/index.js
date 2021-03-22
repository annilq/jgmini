import React from 'react';
import JgCustomPage from '@/components/CustomForm/JgCustomPage';
import { useHeaderBar,useListItem } from '@/hooks/useDetailCom';

function Main(props) {
  // formCode与后台服务一样的名字
  const {
    match: {
      params: { formCode },
    },
  } = props;

  // 拦截修改route，将动态formCode获取再重新设置
  const { route, ...rest } = props;
  // 用户自定义表单查询时候需要formCode
  route.params = { formCode };
  const newRoute = { ...route, formCode };
  // formCode与后台服务一样的名字
  const newProps = { route: newRoute, ...rest };
  const { componentPath } = route;
  const { headerBar } = useHeaderBar(componentPath);
  const { ListItem } = useListItem(componentPath);

  // 自定义表单共用路由，每次formCode改变都要重新渲染才可以
  return (
    <JgCustomPage
      key={newRoute.formCode}
      {...newProps}
      ISUSERCREATE
      header={headerBar}
      ListItem={ListItem}
    />
  );
}

export default Main;
