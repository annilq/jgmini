import React from 'react';
import { Tag } from 'annar';
import { View, Text } from 'remax/wechat';

import style from './index.less';

function TagList({ value=[], onChange, ...rest }) {
  const list = value&&value.map(item => (
    <Tag
      color={item.color}
      className={style.tag}
      key={item.id}
      {...rest}
      {...onChange && { onClick: () => onChange(item) }}
    >
      <Text className={style.dot}>&#9679;</Text>
      {item.name}
    </Tag>
  ));
  return <View className={style.taglist}>{list}</View>;
}
export default TagList;
