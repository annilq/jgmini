import React from 'react';
import { connect } from 'react-redux';

// 每个流程默认会有发起，导出，打印，设置按钮
type OperationType = 'WRITE' | 'DOWNLOAD' | 'PRINT' | 'SETTING';
interface Iprops {
  operationType: OperationType;
  operations: ['WRITE', 'DOWNLOAD', 'PRINT', 'SETTING'];
  children: React.ReactElement;
  [index: string]: any;
}
function OperationButton({
  operations = ['WRITE', 'DOWNLOAD', 'PRINT', 'SETTING'],
  children,
  operationType,
}: Iprops) {
  // 根据当前按钮type来判断是否有权限
  if (operations.indexOf(operationType) < 0) {
    return false;
  }
  return <>{children}</>;
}

export default connect(({ menu }) => ({
  operations: menu.curRouter.operations,
}))(OperationButton);
