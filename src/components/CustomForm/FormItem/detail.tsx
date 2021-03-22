import React, { PureComponent } from 'react';
import ErrorBoundary from './errorhandle';
import { ConTypes } from '@/components/CustomForm/controlTypes';
import LayerPage from '@/components/LayerPage';

import {
  DataSelecter,
  FilePreview,
  ImagePreview,
  TreePicker,
  JgNumber,
  InvoiceUpload,
} from '@/components/CustomForm';
import TagList from '@/components/CustomForm/TaskTag/taglist';
import TableList from '@/components/CustomForm/SubTable/detail';
import Address from '@/components/CustomForm/Address/detail';
import RelationData from '@/components/CustomForm/RelationData/detail';
import RangePicker from '@/components/CustomForm/JgDatePicker/rangepicker';
import DetailModal from '@/components/CustomForm/DetailModal/detail';

interface FormDetailProps {
  data: JgFormProps.ControlConfig;
  // 打开详情页面
  showDetail: () => void;
  formdata: object;
}

@ErrorBoundary('数据渲染错误')
class FormItemData extends PureComponent<FormDetailProps> {
  getRenderByFormData = (data: FormDetailProps['data']): any => {
    const { formdata } = this.props;
    const value = formdata[data.controlCode];
    let render;
    switch (data.controlType) {
      // 下拉框
      // 单选框
      case ConTypes.SELECT:
      case ConTypes.RADIO:
        render = (
          <DataSelecter extraProps={data.extraProps} store={window.g_app._store}>
            {candidates => {
              const candidate = candidates.find(item => item.value === value);
              return candidate && candidate.label;
            }}
          </DataSelecter>
        );
        break;
      // 多选框
      case ConTypes.CHECKBOXG:
        render = (
          <DataSelecter extraProps={data.extraProps} store={window.g_app._store}>
            {candidates => {
              const label = value.reduce((accumulator, currentValue) => {
                const obj = candidates.find(candidate => candidate.value === currentValue);
                return accumulator + (obj ? `${obj.label},` : '');
              }, '');
              return label;
            }}
          </DataSelecter>
        );
        break;
      // 数据选择
      case ConTypes.DATAPICKER:
        // 如果有nameCode的时候直接根据nameCode显示(接口有返回)，不需要额外判断
        // 没有的话再根据controlCode显示
        const nameCode = data.extraProps.nameCode || data.controlCode.replace('Id', 'Name');
        const { linkable } = data.extraProps;

        if (linkable) {
          render = (
            <div
              style={{
                color: '#4095ff',
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              // 关联数据查看详情
              onClick={() => LayerPage.showPage(<DetailModal formConfig={data} id={value} />)}
            >
              {formdata[nameCode]}
            </div>
          );
        } else {
          render = formdata[nameCode];
        }

        break;
      case ConTypes.TREEPICKER:
        render = (
          <TreePicker
            extraProps={data.extraProps}
            controlCode={data.controlCode}
            style={{ width: '120px' }}
            value={value}
            disabled
            store={window.g_app._store}
          />
        );
        break;
      case ConTypes.INVOICE:
        render = <InvoiceUpload value={value} readOnly />;
        break;
      case ConTypes.DATERANGE:
        render = <RangePicker value={value} readOnly />;
        break;

      // 显示文件列表
      case ConTypes.FILEUPLOADER:
        render = <FilePreview files={value} />;
        break;
      // 显示文件列表
      case ConTypes.NUMINPUT:
        render = (
          <JgNumber
            value={value}
            readOnly={true}
            extraProps={data.extraProps}
            formdata={formdata}
          />
        );
        break;
      // 显示图片列表
      case ConTypes.IMAGEUPLOADER:
        render = <ImagePreview files={value} />;
        break;
      case ConTypes.SUBTABLE:
        // formCode
        render = (
          <TableList
            value={value}
            extraProps={data.extraProps}
            observerextraprops={data.observerextraprops}
            store={window.g_app._store}
            formdata={formdata}
          />
        );
        break;
      case ConTypes.RelationData:
        // formCode
        render = <RelationData value={formdata.relations} config={data.extraProps} />;
        break;
      case ConTypes.TASK:
        // formCode
        render = <TagList value={value && JSON.parse(value)} />;
        break;
      case ConTypes.ADDRESS:
        // formCode
        render = <Address value={value} />;
        break;
      default:
        // 默认显示文字
        render = value;
        break;
    }
    return render;
  };

  render() {
    const { data, showDetail, formdata } = this.props;
    const render = this.getRenderByFormData(data);
    if (data.extraProps.primaryKey && showDetail) {
      return (
        <span
          style={{
            color: '#4095ff',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          onClick={() => showDetail(formdata)}
        >
          {render}
        </span>
      );
    }
    return <>{render}</>;
  }
}
export default FormItemData;
