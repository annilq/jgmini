import React, { PureComponent } from 'react';
import Detail from '@/components/CustomForm/detail/combine';
import EnquireList from './EnquireList';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        {item.enquiryMaterialList && item.enquiryMaterialList.length > 0 &&
          <EnquireList value={item.enquiryMaterialList} title="明细" key="details" />
        }
      </Detail>
    );
  }
}
export default Main;
