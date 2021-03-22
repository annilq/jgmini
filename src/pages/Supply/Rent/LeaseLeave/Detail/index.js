import React, { PureComponent } from 'react';

import SectionHeader from '@/components/SectionHeader';
import Detail from '@/components/CustomForm/detail/combine';
import TableList from '@/components/CustomForm/SubTable/detailList';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode}>
        {item.leaseDetailList && item.leaseDetailList.length > 0 &&
          <div className="containers">
            <SectionHeader
              title="退场明细"
              style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
            />
            <TableList
              extraProps={{
                formCode: 'leaseOutDetail',
                referenceType: 1,
              }}
              value={item.leaseDetailList}
            />
          </div>
        }
      </Detail>
    );
  }
}
export default Main;
