import React from 'react';
import { Column } from '@ant-design/charts';
import { Divider } from 'antd';

import FormDetailItem from '@/components/CustomForm/FormItem/detail';
import styles from "./index.less"

function Main(props) {
  const { value = [], year } = props;


  const sumValue = {
    itemName: "合计",
    type: "sum"
  }

  if (value) {
    value.forEach(item => {
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
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <div><div style={{ marginLeft: 20, marginRight: 10, display: "inline-block", width: 12, height: 12, backgroundColor: "#93D072" }} />计划资金  </div>
        <div><div style={{ marginLeft: 20, marginRight: 10, display: "inline-block", width: 12, height: 12, backgroundColor: "#2D71E7" }} />实际资金</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <>
          <div className={styles.chartItemLabel}>全年计划资金合计: {sumValue.totalAmount}元 <span style={{ paddingLeft: 40 }}>全年实际资金合计: {sumValue.totalUse}元</span></div>
          <ChartItem
            value={sumValue}
            year={year}
            style={{
              width: "100%",
              height: 500
            }}
          />
          <Divider dashed style={{ margin: "10px 0" }} />
          {value.map((item, index) => (
            <>
              <div className={styles.chartItemLabel}>
                <span>分类:<FormDetailItem
                  data={{
                    controlType: 6,
                    controlCode: "itemType",
                    extraProps: {
                      flag: "projectFeeTypeMap",
                      type: 2,
                      readOnly: true
                    },
                    placeHolder: "分类",
                  }}
                  value={item.itemType}
                  formdata={item}
                />
                </span>
              </div>
              <ChartItem
                key={item.id}
                value={item}
                year={year}
                style={{
                  width: "100%",
                  height: 500
                }}
              />
              {((index) % 2 === 0 && (index !== value.length - 1)) && <Divider dashed style={{ margin: "10px 0" }} />}
            </>)
          )}

        </>
      </div>
    </>
  );
}

function ChartItem(props) {
  const { value, title, style } = props;
  let data = [];
  for (let index = 1; index < 13; index += 1) {
    const plan = `month${index}`;
    const actual = `month${index}Use`;
    const dateStr = `${index}月`;
    data = data.concat([{ date: dateStr, value: value[plan] || 0, type: '计划资金(元)', }, { date: dateStr, value: value[actual] || 0, type: '实际资金(元)', }])
  }
  // console.log(data);
  const config = {
    isGroup: true,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ({ type }) => {
      switch (type) {
        case "计划资金(元)":
          return "#93D072";
        case "实际资金(元)":
          return "#2D71E7";
      }
      // return type === '计划资金' ? '#93D072' : '#2D71E7';
    },
    marginRatio: 0,
  };
  return (
    <div
      className={styles.chartItem}
      style={style}
    >
      <Column {...config} />
    </div>
  );
}

export default Main;
