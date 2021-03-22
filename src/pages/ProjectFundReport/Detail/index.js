import React, { PureComponent } from 'react';

import Detail from '@/components/CustomForm/detail/combine';
import List from './detail';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        {item.detailList && item.detailList.length > 0 && (
          <List data={item} />
        )}
      </Detail>
    );
  }
}
export default Main;
