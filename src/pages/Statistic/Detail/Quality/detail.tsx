import React from 'react';
import { Card, Col, Row } from 'antd';
import { WaterWave, Radar, MiniProgress } from 'ant-design-pro/lib/Charts';

import SectionHeader from '@/components/SectionHeader';

import styles from "../index.less"

function Detail(props) {
  const { data } = props;
  const { detailQty, awardQty, punishQty, reformQty, passQty, warnQty, notPassQty } = data
  const radarData = [];
  const radarTitleMap = {
    passQty: '检查通过',
    warnQty: '口头警告',
    notPassQty: '检查未通过',
  };
  Object.keys(radarTitleMap).forEach(key => {
    radarData.push({
      // 单个维度
      name: "",
      label: radarTitleMap[key],
      value: data[key],
    });
  });
  const awardPct = parseInt((awardQty / detailQty) * 100, 10)
  const punishPct = parseInt((punishQty / detailQty) * 100, 10)
  return (
    <div
      className="containers"
    >
      <SectionHeader
        title="统计图表"
        style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
      />
      <div style={{ width: "100%" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              bordered
              bodyStyle={{
                paddingTop: 40,
                textAlign: "center",
                height: 400
              }}
            >
              <div className={styles.waterWave}>
                <WaterWave
                  height={280}
                  title={<span style={{ fontSize: 18 }}>整改单占比</span>}
                  percent={parseInt((reformQty * 100 / detailQty), 10)}
                />
                <div style={{ width: 300, margin: "0 auto", display: "flex" }}>
                  <div style={{ flex: 1 }}>检查明细总数:  <span style={{ fontSize: 26, color: "#3aa0ff" }}>{detailQty}</span></div>
                  <div style={{ flex: 1 }}>整改单总数:  <span style={{ fontSize: 26, color: "#36cbcb" }}>{reformQty}</span></div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              bordered
              bodyStyle={{
                paddingTop: 40,
                textAlign: "center",
                height: 400
              }}
            >
              <Radar hasLegend={false} height={280} data={radarData} tickCount={5} />
              <div style={{ width: 450, margin: "0 auto", display: "flex" }}>
                <div style={{ flex: 1 }}>检查通过:  <span style={{ fontSize: 26, color: "#3aa0ff" }}>{passQty}</span></div>
                <div style={{ flex: 1 }}>检查未通过:  <span style={{ fontSize: 26, color: "#3aa0ff" }}>{notPassQty}</span></div>
                <div style={{ flex: 1 }}>口头警告:  <span style={{ fontSize: 26, color: "#3aa0ff" }}>{warnQty}</span></div>
              </div>
            </Card>
          </Col>
        </Row>
        <div>
          <Card bordered style={{ paddingTop: 0, lineHeight: "20px", marginTop: 20 }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>奖励</div>
              <div>共<span style={{ fontSize: 26, color: "#36cbcb" }}>{awardQty}</span>条</div>
            </div>
            <MiniProgress percent={awardPct > 100 ? 100 : awardPct} strokeWidth={8} target={awardPct > 100 ? 100 : awardPct} />
            <div style={{ display: "flex", marginTop: 30 }}>
              <div style={{ flex: 1 }}>惩罚</div>
              <div>共<span style={{ fontSize: 26, color: "#3aa0ff" }}>{punishQty}</span>条</div>
            </div>
            <MiniProgress percent={punishPct > 100 ? 100 : punishPct} strokeWidth={8} target={punishPct > 100 ? 100 : punishPct} color="#3296fe" />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Detail;
