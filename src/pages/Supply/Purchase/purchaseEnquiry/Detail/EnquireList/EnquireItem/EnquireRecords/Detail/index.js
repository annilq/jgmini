import React, { PureComponent } from 'react';
import { layerBoxStyle, layerContentStyle } from '@/common/styles/layer';
import Layer from '@/components/Layer';

import styles from '../../../../../index.less';

class RecordDetail extends PureComponent {
  render() {
    const { onConfirm, onCancel, value, visible } = this.props;
    return (
      <Layer title="询价记录" visible={visible} onOk={onConfirm} onClose={onCancel} width={700}>
        <div style={layerBoxStyle}>
          <div style={{ ...layerContentStyle, paddingTop: '0' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                textAlign: 'left',
              }}
            >
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>供应商名称</div>
                <div className={styles['form-info-value']}>{value.supplierName}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>供应商地址</div>
                <div className={styles['form-info-value']}>{value.supplierAddress}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>联系人</div>
                <div className={styles['form-info-value']}>{value.stockNum}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>联系电话</div>
                <div className={styles['form-info-value']}>{value.mobile}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>单价</div>
                <div className={styles['form-info-value']}>{value.unitprice}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>总报价</div>
                <div className={styles['form-info-value']}>{value.totalPrice}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>送货日期</div>
                <div className={styles['form-info-value']}>{value.deliveryDate}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>品牌</div>
                <div className={styles['form-info-value']}>{value.brand}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>质量标准</div>
                <div className={styles['form-info-value']}>{value.qualityStandard}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>付款条件</div>
                <div className={styles['form-info-value']}>{value.paymentTerm}</div>
              </div>
              <div className={styles['form-info-item']}>
                <div className={styles['form-info-label']}>备注</div>
                <div className={styles['form-info-value']}>{value.remark}</div>
              </div>
            </div>
          </div>
        </div>
      </Layer>
    );
  }
}
export default RecordDetail;
