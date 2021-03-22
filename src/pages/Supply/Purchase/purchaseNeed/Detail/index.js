import React, { PureComponent } from 'react';
import Detail from '@/components/CustomForm/detail/combine';
import TableForm from '../TableForm/TableDetails';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        {item.id&&<TableForm formId={item.id} title="明细" key="details" />}
      </Detail>
    );
  }
}
export default Main;
