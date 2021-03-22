import React, { PureComponent } from 'react';
import Detail from '@/components/CustomForm/detail/combine';
import List from './List';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        {item.feedbackList && item.feedbackList.length > 0 && <List data={item.feedbackList} />}
      </Detail>
    );
  }
}
export default Main;
