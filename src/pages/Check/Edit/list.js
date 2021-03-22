import React, { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import TableWrapper from "@/components/CustomForm/SubTable/tableWrapper"
import Layer from '@/components/Layer';
import useLayerVisible from '@/hooks/useLayer';

import Edit from './edit';
import Detail from '../Detail/CheckDetail';

function List({ onChange, value: defaultvalue }) {
  const value = defaultvalue || [];
  const [visible, setVisible] = useLayerVisible(false);
  const [itemIndex, setItemIndex] = useState(-1);
  function submit(obj) {
    if (itemIndex !== -1) {
      value.splice(itemIndex, 1, obj);
    } else {
      value.push(obj);
    }
    onChange(value);
    setVisible(false);
  }

  function deleteItem() {
    value.splice(itemIndex, 1);
    onChange(value);
    setVisible(false);
  }

  function editItem(index) {
    setItemIndex(index);
    setVisible(true);
  }
  const itemData = value[itemIndex] || null;
  return (
    <>
      <TableWrapper title="检查明细" onAddItem={() => { setItemIndex(-1); setVisible(true) }}>
        {value.map((item, index) => (
          <EditItem
            data={item}
            onEdit={() => editItem(index)}
          />
        ))}
      </TableWrapper>
      <Layer
        type="drawer"
        visible={visible}
        width="100%"
      >
        <Edit data={itemData} onSubmit={submit} {...(itemIndex !== -1 && { onDelete: deleteItem })} />
      </Layer>
    </>
  );
}

function EditItem(props) {
  const { data, onEdit } = props;
  return (
    <div style={{ position: 'relative', display: "flex" }} onClick={onEdit}>
      <Detail data={data} style={{ flex: 1 }} />
      <RightOutlined style={{ color: "#999", alignSelf: "center" }} />
    </div>
  );
}

export default List;
