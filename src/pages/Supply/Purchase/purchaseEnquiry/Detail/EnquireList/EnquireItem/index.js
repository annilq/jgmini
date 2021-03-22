import React, { PureComponent } from 'react';
import { layerBoxStyle, layerContentStyle } from '@/common/styles/layer';
import EnquireRecords from './EnquireRecords';
import styles from '../../../index.less';

class EnquireItem extends PureComponent {
  render() {
    const { value = {} } = this.props;
    const { enquiryRecordsList = [] } = value;
    return (
      <div style={layerBoxStyle} className={styles.enquireItem}>
        <div style={{ ...layerContentStyle, paddingTop: '0' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              textAlign: 'left',
            }}
          >
            <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>物资名称</div>
              <div className={styles['form-info-value']}>{value.materialName}</div>
            </div>
            <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>规格</div>
              <div className={styles['form-info-value']}>{value.specs}</div>
            </div>
            <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>单位</div>
              <div className={styles['form-info-value']}>{value.unit}</div>
            </div>
            {/* <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>计划单价</div>
              <div className={styles['form-info-value']}>{value.planUnitprice}</div>
            </div> */}
            {/* <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>询价日期</div>
              <div className={styles['form-info-value']}>{value.enquiryDate}</div>
            </div> */}
            <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>询价数量</div>
              <div className={styles['form-info-value']}>{value.enquiryNum}</div>
            </div>
            {/* <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>库存数量</div>
              <div className={styles['form-info-value']}>{value.stockNum}</div>
            </div> */}
            {/* <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>前次采购厂商</div>
              <div className={styles['form-info-value']}>{value.supplierNameOld}</div>
            </div>
            <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>前次采购单价</div>
              <div className={styles['form-info-value']}>{value.purPriceOld}</div>
            </div>
            <div className={styles['form-info-item']}>
              <div className={styles['form-info-label']}>需用日期</div>
              <div className={styles['form-info-value']}>{value.needDate}</div>
            </div> */}
          </div>
        </div>
        <EnquireRecords value={enquiryRecordsList} />
      </div>
    );
  }
}

export default EnquireItem;
