import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

// import {Tag, List, Avatar} from 'antd';
import {connect} from 'react-redux';
// import Link from 'umi/link';

// import FormItemData from '@/components/CustomForm/FormItem/detail';
// import {getLocalCols} from '@/utils/table';
// import {getApprovalStatusColor, getApprovalStatusText} from '@/utils/utils';

import useFormConfig from '@/hooks/useFormConfig';

interface IProps {
  formCode: string;
  data: any;
  // 用户自定义列头
  customCols?: any[];
  tableConfig: JgFormProps.FormConfig;
  [index: string]: any;
}

function Index(props: IProps) {
  const {formCode, data} = props;

  const {tableConfig} = useFormConfig(formCode, null, false);
  // console.log(data);
  const {pagination} = data;
  // 设置表格宽度
  return (
    // <List
    //   dataSource={data.list || []}
    //   renderItem={item => (
    //     <List.Item key={item.id} onClick={() => props.showDetail(item)}>
    //       <List.Item.Meta
    //         avatar={
    //           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    //         }
    //         title={item.name}
    //         description={item.name}
    //       />
    //       <div>{item.name}</div>
    //     </List.Item>
    //   )}></List>
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

export default connect(({table}) => ({
  table,
}))(Index);
