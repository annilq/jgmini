import React from 'react';
import JgCustomPage from '@/components/CustomForm/JgCustomPage';
import { useQuery } from 'remax';
import { getConfigFormPath } from '@/components/CustomForm/routerConfig'
import ListItemCell from '@/components/TableItem/ListItem';

function Main(props) {
  const { path } = useQuery();
  const ifSystemForm = path.indexOf('usercreate') > -1;
  let config;
  if (ifSystemForm) {
    config = getConfigFormFormCode("USERCREATE");
  } else {
    config = getConfigFormPath(path);
  }
  // formCode与后台服务一样的名字
  return <JgCustomPage formCode={config.formCode} ListItem={ListItemCell} ISUSERCREATE={ifSystemForm} />;
}

export default Main;
