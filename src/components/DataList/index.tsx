import React from 'react';
import { usePageEvent } from 'remax/macro';
import { Checkbox, Radio } from 'annar';
import List from './List';
import styles from "./index.less"
interface Iprops {
  data: {
    list: any[];
    currentPage?: number;
    pageSize?: number;
    totalPage?: number;
  };
  renderItem: (data: any, index: number) => React.ReactElement;
  loadMore?: (params: any) => void;
  rowSelection?: {
    onChange: (selectedRowKeys, selectedRows) => void;
    selectedRowKeys: any[];
    type: 'checkbox' | 'radio';
  };
  loading?: boolean;
  rowKey?: string
}

function Main(props: Iprops) {
  const { data, loadMore, loading, renderItem, rowSelection, rowKey = "id", ...rest } = props;
  let RenderList = <List dataSource={data.list || []} renderItem={renderItem} />;
  if (rowSelection) {
    const { onChange, type, selectedRowKeys } = rowSelection;
    switch (type) {
      case 'radio':
        RenderList = (
          <RadioList
            renderItem={renderItem}
            data={data}
            onChange={onChange}
            value={selectedRowKeys[0]}
            rowKey={rowKey}
          />
        );
        break;

      case 'checkbox':
        RenderList = (
          <CheckBoxList
            renderItem={renderItem}
            data={data}
            onChange={onChange}
            value={selectedRowKeys}
            rowKey={rowKey}
          />
        );
        break;

      default:
        break;
    }
  }
  usePageEvent('onReachBottom', () => {
    console.log('onReachBottom');
    !loading && data.currentPage < data.totalPage &&
      loadMore({
        currentPage: data.currentPage + 1,
        pageSize: data.pageSize,
      });
  })

  return (
    // 这里如果外面包一层的话不会触发loadMore
    <>
      {RenderList}
    </>
  );
}

function RadioList(props) {
  const { value, data, renderItem, rowKey } = props;

  function onChange(value) {
    const item = data.list.find((item) => item[rowKey] === value);
    props.onChange([value], [item]);
  }
  return (
    <Radio.Group onChange={(e) => onChange(e.target.value)} value={value} style={{ width: '100%' }}>
      <List
        renderItem={(item, index) => (
          <Radio value={item[rowKey]} className={styles.radioStyle}>
            {renderItem(item, index)}
          </Radio>
        )}
        dataSource={data.list || []}
      />
    </Radio.Group>
  );
}
function CheckBoxList(props) {
  const { value, data, renderItem, rowKey } = props;

  function onChange(value: []) {
    const itemAtt = data.list.filter((item) => value.indexOf(item[rowKey]) > -1);
    props.onChange(value, itemAtt);
  }

  return (
    <Checkbox.Group onChange={(value) => onChange(value)} value={value} style={{ width: '100%' }}>
      <List
        renderItem={(item, index) => (
          <Checkbox value={item[rowKey]} className={styles.radioStyle}>
            {renderItem(item, index)}
          </Checkbox>
        )}
        dataSource={data.list || []}
      />
    </Checkbox.Group>
  );
}
Main.Item = List.Item;
export default Main;
