import React, { PureComponent } from 'react';
import JgCustomPage from '@/components/CustomForm/JgCustomPage';
import Detail from './Detail';

class Main extends PureComponent {
  render() {
    // formCode与后台服务一样的名字
    return <JgCustomPage {...this.props} DetailCom={Detail} />;
  }
}

export default Main;
