import React from 'react';
import { Tabs } from 'annar';
import { View } from "remax/wechat"
import { relation as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import RelateDetail from './detail';

const { TabContent } = Tabs;

interface IProps {
  domainFormCode: string;
  domainId: string;
}

interface ModuleInte extends IProps {
  domainFormName: string;
  relateFormCode: string;
  count: number;
}

function RelationModule(props: IProps) {
  const { domainFormCode, domainId } = props;
  const { data = [] } = useFetch<ModuleInte[]>(api.getRelateMenuList, { domainFormCode, domainId });

  if (!data || data.length === 0) {
    return (
      <View style={{ lineHeight: '70px', textAlign: 'center', backgroundColor: '#fff' }}>
        暂无关联模块
      </View>
    );
  }
  const modulitems = data.map(item => (
    <TabContent
      tab={item.domainFormName}
      key={item.relateFormCode}
    >
      <RelateDetail data={item} domainFormCode={domainFormCode} />
    </TabContent>
  ));
  return <Tabs type="plain" >{modulitems}</Tabs>;
}
export default RelationModule;
