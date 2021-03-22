import React from 'react';
import FormItemData from '@/components/CustomForm/FormItem/detail';
import { DataSelecter } from '@/components/CustomForm';
import { ConTypes } from '@/components/CustomForm/controlTypes';

function RelationList({ value, config }) {
  const newValue = (value && JSON.parse(value)) || [];

  const list = newValue.map((item, index) => (
    <RelationItem key={index} value={item} config={config} />
  ));
  return <div className="containers">{list}</div>;
}

function RelationItem({ value, config }) {
  const { relationModule } = value;

  return (
    <DataSelecter extraProps={config} store={window.g_app._store}>
      {candidates => {
        const selectObj = candidates.find(item => item.value === relationModule);
        
        if(!selectObj){
          return false
        }

        return (
          <>
            <div className="form-info-item" style={{ width: '50%' }}>
              <div className="form-info-label">关联模块</div>
              <div className="form-info-value">{selectObj.label}</div>
            </div>
            {selectObj && (
              <div className="form-info-item" style={{ width: '50%' }}>
                <div className="form-info-label">{selectObj.itemText}</div>
                <div className="form-info-value">
                  <FormItemData
                    data={{
                      controlCode: 'relationId',
                      controlType: ConTypes.DATAPICKER,
                      controlLabel: selectObj.itemText,
                      extraProps: {
                        formCode: selectObj.description,
                        nameCodeKey: 'recordNo',
                        nameCode: 'recordNo',
                        linkable: true,
                      },
                    }}
                    formdata={value}
                  />
                </div>
              </div>
            )}
          </>
        );
      }}
    </DataSelecter>
  );
}

export default RelationList;
