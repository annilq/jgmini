import React, { useState, useEffect } from 'react';
import Detail from '@/components/CustomForm/detail';

import useFormConfig from '@/hooks/useFormConfig';
import getServiceFromFormCode, { FormCodeType } from '@/components/CustomForm/FormCodeService';

import { flatdata } from '@/models/jgtablemodel';

interface IProps {
  id: string;
  onClose: () => void;
  formConfig: JgFormProps.ControlConfig;
}

function ModalDetail(props: IProps) {
  const { formConfig, onClose, id } = props;
  const {
    extraProps: { formCode, formType },
    controlLabel,
  } = formConfig;
  const title = controlLabel.replace('名称', '');
  const [formdata, setFormData] = useState({ sysVersionId: '', versionId: '' });

  useEffect(() => {
    async function getQueryData() {
      if (!formCode) {
        return;
      }
      let serviceObject;
      switch (formType) {
        case 'fullCust':
          serviceObject = getServiceFromFormCode(formCode as FormCodeType, 'USERCREATE');
          break;
        case 'cust':
        case 'system':
          serviceObject = getServiceFromFormCode(formCode as FormCodeType);
          break;
        default:
          serviceObject = getServiceFromFormCode(formCode as FormCodeType);
          break;
      }

      // 根据id在基础表查基础数据，在子表查询拓展数据
      const response = await serviceObject.query({ id });
      if (response && response.resp) {
        // 需要将拓展字段exts格式打平，提升到data中，方便回显表单数据
        const formdata = flatdata(response.resp);
        setFormData(formdata);
      }
    }
    getQueryData();
  }, []);

  const { sysVersionId, versionId } = formdata;
  const { tableConfig: config } = useFormConfig(formCode, { sysVersionId, versionId }, true);

  return (
    <div className="form-detail-content">
      <Detail
        item={formdata}
        containers={config.containers}
        formCode={formCode}
        store={window.g_app._store}
      />
    </div>
  );
}

export default ModalDetail;
