import React, { PureComponent } from 'react';
import Detail from '@/components/CustomForm/detail/combine';

import CheckList from './CheckList';
import IncentiveList from './IncentiveList';
import ReformList from './ReformList';

class Main extends PureComponent {
  render() {
    const { item, formCode } = this.props;
    return (
      <Detail item={item} formCode={formCode} >
        <>
          {item.inspectionItemName && (
            <div className="containers" style={{ marginTop: -10 }}>
              <div className="form-container-content">
                <div className="form-info-item">
                  <div className="form-info-label">检查项</div>
                  <div className="form-info-value"><a>{item.inspectionItemName}</a></div>
                </div>
              </div>
            </div>
          )}
          {item.inspectionDetails && item.inspectionDetails.length > 0 && (
            <CheckList data={item.inspectionDetails} />
          )}
          {item.inspectionRaps && item.inspectionRaps.length > 0 && (
            <IncentiveList data={item.inspectionRaps} />
          )}
          {item.inspectionReforms && item.inspectionReforms.length > 0 && (
            <ReformList data={item.inspectionReforms} />
          )}
        </>
      </Detail>
    );
  }
}
export default Main;
