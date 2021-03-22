import React, { PureComponent } from 'react';
import SectionHeader from '@/components/SectionHeader';

import Detail from '@/components/CustomForm/detail/combine';
import DetailList from './detailList';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        {item.detailList && item.detailList.length > 0 && (
          <div className="containers">
            <SectionHeader
              title="填报明细"
              style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
            />
            <DetailList value={item.detailList} />
          </div>
        )}
      </Detail>
    );
  }
}
export default Main;
