import React from 'react';
import JgCustomPage from '@/components/CustomForm/JgCustomPage';
import { useListItem } from '@/hooks/useDetailCom';

function Main(props) {
  const { route: { componentPath } } = props;
  const { ListItem } = useListItem(componentPath);
  // formCode与后台服务一样的名字
  return <JgCustomPage {...props} ListItem={ListItem} />;
}

export default Main;
