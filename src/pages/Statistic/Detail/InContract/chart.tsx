import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { Gauge } from 'ant-design-pro/lib/Charts';

import htzje from "@/pages/Statistic/images/htzje.png"
import ykpje from "@/pages/Statistic/images/ykpje.png"

function ChartDetail(props) {
  const { data } = props
  const { totalAmount, invoiceAmount, paymentAmount, remainingAmount } = data
  return (
    <div style={{ width: "100%" }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            bordered
            bodyStyle={{
              padding: "20px 40px",
              height: 140,
              display: "flex"
            }}
          >
            <div>
              <img src={htzje} alt="" />
            </div>
            <div style={{ marginLeft: 30, padding: "15px 0" }}>
              合同总金额
              <div style={{ fontSize: 32, marginTop: 10 }}><Statistic value={totalAmount} precision={2} /></div>
            </div>
          </Card>
        </Col><Col span={12}>
          <Card
            bordered
            bodyStyle={{
              padding: "20px 40px",
              height: 140,
              display: "flex"
            }}
          >
            <div>
              <img src={ykpje} alt="" />
            </div>
            <div style={{ marginLeft: 30, padding: "15px 0" }}>
              已开票金额
              <div style={{ fontSize: 32, marginTop: 10 }}><Statistic value={invoiceAmount} precision={2} /></div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 10 }} >
        <Col span={12}>
          <Card
            bordered
            bodyStyle={{
              paddingTop: 40,
              textAlign: "center",
              height: 400
            }}
          >
            <div>已收款金额</div>
            <Gauge title={paymentAmount} height={300} percent={paymentAmount * 100 / totalAmount} formatter={() => ""} />
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
            <div>未收款金额</div>
            <Gauge title={remainingAmount} height={300} percent={remainingAmount * 100 / totalAmount} formatter={() => ""} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default ChartDetail