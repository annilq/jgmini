import React, { PureComponent } from 'react';
import SectionHeader from '@/components/SectionHeader';
import CheckDetail from './CheckDetail';

class Main extends PureComponent {
  render() {
    const { data = [] } = this.props;
    return (
      <div className="containers">
        <SectionHeader
          title="检查明细"
          style={{ width: '100%', lineHeight: '50px', marginBottom: '0' }}
        />
        <div className="form-container-content">
          {data.map((item, index) => (
            <CheckDetail
              data={item}
              key={item.id}
              style={{
                width: "100%",
                ...(index !== 0 && { borderTop: 'dashed 1px #d9d9d9' })
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Main;
