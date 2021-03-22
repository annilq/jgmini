import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import GroupItem from "./groupItem"

function Index(props) {
  const { list, configlist, dispatch } = props;
  const [editMode, setEditMode] = useState(false);

  const getList = () => {
    dispatch({
      type: 'statistic/listRemote',
    });
  }
  const getConfigList = () => {
    dispatch({
      type: 'statistic/configListRemote'
    });
  }

  useEffect(
    () => {
      if (editMode) {
        getConfigList()
      } else {
        getList()
      }
    }, [editMode]);

  let newList = list;
  if (editMode) {
    newList = configlist
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #f5f5f5", fontSize: 16, lineHeight: "30px" }}>
        <div style={{ flex: 1 }}>
          报表管理
        </div>
        <div>
          {editMode ? (
            <Button
              onClick={() => setEditMode(!editMode)}
            >返回
            </Button>
          ) : (
              <Button
                type="primary"
                onClick={() => setEditMode(!editMode)}
              >
                设置
              </Button>
            )
          }
        </div>
      </div>
      {newList.map(item => <GroupItem data={item} editMode={editMode} />)}
    </div>
  );
}

export default connect(({ statistic }) => ({
  list: statistic.list,
  configlist: statistic.configlist
}))(Index);

