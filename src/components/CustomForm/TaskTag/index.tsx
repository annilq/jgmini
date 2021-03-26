// 已经确认过树形结构中的父级选项可以作为选择2019/7/1
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Tag, Button } from 'annar';
import { View } from 'remax/wechat';
import api from '@/services/task/tag';
import style from './index.less';
import TagList from './taglist';

function TaskTag({ dispatch, onChange, value: defaultValue, formdata }) {
  const value = (defaultValue && JSON.parse(defaultValue)) || [];
  const [visible, setvisible] = useState(false);

  function onChangeHandle(tag) {
    const selected = !!value.find(item => item.id === tag.id);
    if (!selected) {
      value.push({ id: tag.id, name: tag.name, color: tag.color });
    }
    onChange(JSON.stringify(value));
  }

  function removeTag(tag) {
    const newValue = value.filter(item => item.id !== tag.id);
    onChange(JSON.stringify(newValue));
  }

  // 项目里面有默认标签
  const { projectId } = formdata;
  useEffect(
    () => {
      if (projectId) {
        dispatch({
          type: 'task/taskDefaultData',
          payload: { id: projectId },
          callback(data) {
            console.log(data);
            const { tags } = data;
            if (tags) {
              const newtag = JSON.parse(tags).map(tag => ({
                id: tag.id,
                name: tag.name,
                color: tag.color,
              }));
              onChange(JSON.stringify(newtag));
            }
          },
        });
      }
    },
    [projectId]
  );
  return (
    <View>
      {/* <Popover
        placement="top"
        content={<TagListPopover onChange={onChangeHandle} onClose={() => setvisible(false)} />}
        trigger="click"
        visible={visible}
      >
        <Tag color="#f50" className={style.tag} onClick={() => setvisible(true)}>
          +添加
        </Tag>
      </Popover> */}
      <TagList value={value} closable onClose={removeTag} />
    </View>
  );
}

function TagListPopover({ onChange, onClose }) {
  const [value, setvalue] = useState([]);

  async function getList() {
    const response = await api.list();
    // console.log(response);
    if (response && response.resp) {
      setvalue(response.resp);
    }
  }
  useEffect(() => {
    getList();
  }, []);
  return (
    <View style={{ width: '480px' }}>
      <TagList value={value} onChange={onChange} />
      <View style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button type="primary" size="small" onClick={onClose}>
          确认
        </Button>
      </View>
    </View>
  );
}

export default connect()(TaskTag);
