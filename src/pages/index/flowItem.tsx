import React from 'react';
import { View, Text, Image } from 'remax/wechat';
import { Icon } from 'annar';

import styles from './index.css';
import { getIconConfigFormPath } from '@/components/CustomForm/routerConfig';

export default (props) => {
  const { data, handleClick } = props
  return (
    <>
      <View className={styles.menuTitle}>
        <Text> {data.menuName}</Text>
      </View>
      <View className={styles.menuGroup}>
        {data.children.map(item => {
          const icon = getIconConfigFormPath(item.url);
          return (
            <View className={styles.menuGroupItem} key={item.menuCode} onTap={() => handleClick(item)}>
              <View style={{ position: "relative" }}>
                <Image src={`/images/${icon}.png`} style={{ width: "52px", height: "52px", marginBottom: 10 }} />
                <Text style={{ position: "absolute", bottom: 0, right: -8, rotate: "45deg" }}>
                  {item.children.length > 0 && <Icon type="right" size="20px" />}
                </Text>
              </View>
              <Text> {item.menuName}</Text>
            </View>)
        })}
      </View>
    </>
  );
};
