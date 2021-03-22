import React, { PureComponent } from 'react';
import SectionHeader from '@/components/SectionHeader';
import TableList from '@/components/CustomForm/SubTable/detailList';

class Main extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="containers">
        <SectionHeader
          title="填报明细"
          style={{ width: '100%', lineHeight: '50px', marginBottom: '0', paddingLeft: '8px' }}
        />
        <TableList
          extraProps={{
            formCode: 'FundPlanDetails',
            referenceType: 1,
          }}
          value={data.detailList}
        />
      </div>

    );
  }
}
export default Main;
