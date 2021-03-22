import React, { PureComponent } from 'react';
import Detail from '@/components/CustomForm/detail/combine';
import CheckList from './CheckList';
import CheckResult from './CheckResult';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        <>
          {item.inspectionDetails && item.inspectionDetails.length > 0 && (
            <CheckList data={item.inspectionDetails}/>
          )}
          <CheckResult data={item} formCode={formCode} />
        </>
      </Detail>
    );
  }
}

export default Main;
