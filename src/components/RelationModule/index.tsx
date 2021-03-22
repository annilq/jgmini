import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import RelateDetail from './detail';
import request from '@/utils/request';
import { relation as api } from '@/services/api';

const { TabPane } = Tabs;

interface IProps {
  domainFormCode: string;
  domainId: string;
}

interface ModuleInte extends IProps {
  domainFormName: string;
  relateFormCode: string;
}
interface ModuleRes extends IProps {
  code: number;
  info: string;
  resp: ModuleInte[];
}

function RelationModule(props: IProps) {
  const { domainFormCode, domainId } = props;
  const [modules, setModules] = useState([]);
  useEffect(
    () => {
      async function getModules() {
        const data = await request<ModuleRes>(api.getRelateMenuList, {
          data: { domainFormCode, domainId },
        });
        // console.log(data);
        if (data && data.resp) {
          setModules(data.resp);
        }
      }
      if (domainId && domainFormCode)
        getModules();
    },
    [domainFormCode, domainId]
  );

  if (modules.length === 0) {
    return (
      <div style={{ lineHeight: '70px', textAlign: 'center', backgroundColor: '#fff' }}>
        暂无关联模块
      </div>
    );
  }
  const modulitems = modules.map(item => (
    <TabPane
      // tab={<Badge count={item.count} offset={[20,0]}>{item.domainFormName}</Badge>}
      tab={item.domainFormName}
      key={item.relateFormCode}
    >
      <RelateDetail data={item} domainFormCode={domainFormCode} />
    </TabPane>
  ));
  return <Tabs tabBarStyle={{ backgroundColor: '#fff' }}>{modulitems}</Tabs>;
}
export default RelationModule;
