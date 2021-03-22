import React, { useState } from 'react';
import { Radio, List } from 'antd';
import SectionHeader from '@/components/SectionHeader';
import useFormConfig from '@/hooks/useFormConfig';
import FormDetailItem from '@/components/CustomForm/FormItem/detail';
import SubTableItemCell from '@/components/TableItem/SubTableItem';
import { getColumnsFromContainersByFliter } from '@/components/CustomForm/FormUtil';

import Detail from '@/components/CustomForm/detail/combine';
import ChartList from './chart';

function Main(props) {
  const { item, formCode } = props;
  const { exts, detailList = [] } = item;
  const [value, setValue] = useState(1);

  const options = [
    { label: '统计图', value: 1 },
    { label: '列表式', value: 2 },
  ];

  function onChange(e) {
    setValue(e.target.value)
  }

  const { tableConfig: { containers } } = useFormConfig(
    "FundPlanSubitems",
    exts && JSON.parse(exts),
    // 如果没有拓展字段就不取版本号
    !!exts
  );

  // 将实际计划加入到列表当中
  const getAllColumns = function getAllColumns(cols) {
    const columnsData = cols.map(
      (col) => {
        let title = col.controlLabel;
        let render = function render(text, record) {
          return <FormDetailItem
            data={col}
            // value={item.itemType}
            formdata={record}
          />
        };
        if (col.controlCode.startsWith("month")) {
          title = `${col.controlLabel}计划/实际`
          render = (text, record) => {
            return `${text || 0}/${record[`${col.controlCode}Use`] || 0}`
          }
        }
        if (col.controlCode === "totalAmount") {
          title = `${col.controlLabel}计划/实际`
          render = (text, record) => {
            return `${text || 0}/${record.totalUse || 0}`
          }
        }

        return {
          title,
          dataIndex: col.controlCode,
          width: "200px",
          render
        }
      },
      []
    );
    return columnsData;
  };

  const cols = getColumnsFromContainersByFliter(containers);
  const allCols = getAllColumns(cols);
  const sumLabel = allCols[0] && allCols[0].dataIndex
  const sumValue = {
    [sumLabel]: "合计"
  }

  if (detailList) {
    detailList.forEach(item => {
      for (let index = 1; index < 13; index += 1) {
        const plan = `month${index}`;
        const actual = `month${index}Use`
        sumValue[plan] = (sumValue[plan] || 0) + item[plan];
        sumValue[actual] = (sumValue[actual] || 0) + item[actual];
      }
      sumValue.totalAmount = (sumValue.totalAmount || 0) + item.totalAmount;
      sumValue.totalUse = (sumValue.totalUse || 0) + item.totalUse;
    })
  }
  return (
    <Detail item={item} formCode={formCode}>
      {detailList && detailList.length > 0 && (
        <div className="containers">
          <SectionHeader
            title="计划明细"
            style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
          />
          <Radio.Group
            options={options}
            onChange={onChange}
            value={value}
            optionType="button"
            buttonStyle="solid"
            style={{ flex: 1, textAlign: "center" }}
          />
          <div style={{ marginTop: 10, width: "100%" }}>
            {value === 2 && (
              <>
                <List
                  renderItem={(item) => (
                    <List.Item>
                      <SubTableItemCell
                        data={item}
                        columns={allCols}
                      />
                    </List.Item>
                  )}
                  loading={false}
                  locale={{ emptyText: '暂无数据' }}
                  dataSource={[...item.detailList]}
                  split={false}
                />
                <div style={{ lineHeight: "40px", fontSize: "16px", paddingLeft: 4 }}>合计</div>
                <SubTableItemCell
                  data={sumValue}
                  columns={allCols.slice(1, allCols.length - 1)}
                />
              </>
            )}
            <div style={{ display: value === 1 ? "block" : "none" }}>
              <ChartList value={[...item.detailList]} year={item.year} />
            </div>
          </div>
        </div>
      )}
    </Detail>
  );

}
export default Main;
