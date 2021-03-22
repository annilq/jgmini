import React, { PureComponent } from 'react';
import EnquireItem from './EnquireItem';
import styles from '../../index.less';

class EnquireList extends PureComponent {
  render() {
    const { value = [] } = this.props;
    const enquireList = value.map(item => <EnquireItem value={item} key={item.id} />);
    return <div className={styles.enquireList}>{enquireList}</div>;
  }
}

export default EnquireList;
