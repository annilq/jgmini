import React, { PureComponent } from 'react';
import { View, Text } from 'remax/wechat';

// import ErrorBoundary from './errorhandle';

import { ConTypes } from '@/components/CustomForm/controlTypes';
// import LayerPage from '@/components/LayerPage';

// import {
//   FilePreview,
//   ImagePreview,
//   TreePicker,
//   InvoiceUpload,
// } from '@/components/CustomForm';

import TreePicker from '@/components/CustomForm/TreePicker';
import ImagePreview from '@/components/CustomForm/ImagePreview';
import DataSelecter from '@/components/CustomForm/DataSelecter';
// import TagList from '@/components/CustomForm/TaskTag/taglist';
import TableList from '@/components/CustomForm/SubTable/detailList';
// import Address from '@/components/CustomForm/Address/detail';
// import RelationData from '@/components/CustomForm/RelationData/detail';
// import RangePicker from '@/components/CustomForm/JgDatePicker/rangepicker';
// import DetailModal from '@/components/CustomForm/DetailModal/detail';
const NODATA_TEXT = "-"

interface FormDetailProps {
  data: JgFormProps.ControlConfig;
  // 打开详情页面
  showDetail?: (data) => void;
  formdata: object;
}

// @ErrorBoundary
class FormItemData extends PureComponent<FormDetailProps> {
  getRenderByFormData = (data: FormDetailProps['data']): any => {
    const { formdata = {} } = this.props;
    const { controlCode, controlType, controlLabel, extraProps, observerextraprops } = data;
    const value = formdata[controlCode];
    let render;
    switch (controlType) {
      //   // 下拉框
      case ConTypes.TEXTAREA:
      case ConTypes.INPUT:
      case ConTypes.DATEPICKER:
        render = (
          <View>
            {value}
          </View>
        );
        break;
      case ConTypes.NUMINPUT:
        render = (
          <View>
            {parseFloat(value)}
          </View>
        );
        break;
      //   // 下拉框
      //   // 单选框
      case ConTypes.SELECT:
      case ConTypes.RADIO:
        render = (
          <DataSelecter extraProps={data.extraProps}>
            {candidates => {
              // 适配下拉框多选功能
              if (!value || candidates.length === 0) {
                return NODATA_TEXT
              }
              const newValue = value.split ? value.split(",") : [value];
              const labels = newValue.map((currentValue) => {
                const candidate = candidates.find(item => {
                  if (isNaN(parseInt(currentValue, 10))) {
                    return item.value === currentValue;
                  } else {
                    return parseInt(item.value, 10) === parseInt(currentValue, 10)
                  }
                });
                return candidate && candidate.label
              });
              return labels.join(",") || NODATA_TEXT
            }}
          </DataSelecter>
        );
        break;
      // 多选框
      case ConTypes.CHECKBOXG:
        render = (
          <DataSelecter extraProps={extraProps} >
            {(candidates) => {
              const label = value.reduce((accumulator, currentValue) => {
                const obj = candidates.find(item => parseInt(item.value, 10) === parseInt(currentValue, 10));
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
        const { linkable, formCode } = data.extraProps;
        let config = data
        if (linkable) {
          // 如果点击了付款明细的关联数据,则直接显示付款单的详情
          if (formCode === "SelectFinancePaymentDetail1") {
            config = { ...data, extraProps: { ...data.extraProps, formCode: "PaymentFinance" } }
          }
          const relateArr = (formdata[nameCode] && formdata[nameCode].split(',')) || [];
          const values = (value && String(value).split(',')) || [];
          const nodes = values.map((value, index) => (
            <Text
              style={{
                color: '#4095ff',
                cursor: 'pointer',
              }}
              key={value}
              // 关联数据查看详情
              onClick={(e) => {
                e.stopPropagation()
                // LayerPage.showPage(
                //   <DetailModal formConfig={data} id={values[index]}  />
                // )
              }
              }
            >
              {relateArr[index] || NODATA_TEXT}
            </Text>
          ));
          render = <>{nodes.length > 0 ? nodes : NODATA_TEXT}</>;
        } else {
          render = formdata[nameCode];
        }

        break;
      case ConTypes.TREEPICKER:
        render = (
          <TreePicker
            extraProps={extraProps}
            controlCode={controlCode}
            style={{ width: '120px' }}
            value={value}
            disabled

          />
        );
        break;
      //   case ConTypes.INVOICE:
      //     render = <InvoiceUpload value={value} readOnly />;
      //     break;
      //   // case ConTypes.DATERANGE:
      //   //   render = <RangePicker value={value} readOnly />;
      //   //   break;

      //   // 显示文件列表
      //   case ConTypes.FILEUPLOADER:
      //     // render = <FilePreview files={value} label={controlLabel} />;
      //     render = <FilePreview value={value} />;
      //     break;
      //   // 显示文件列表
      //   // 显示图片列表
      case ConTypes.IMAGEUPLOADER:
        render = <ImagePreview files={value} />;
        // render = <ImagePreview value={value} />;
        break;
        case ConTypes.SUBTABLE:
          // formCode
          render = (
            <TableList
              // title={controlLabel}
              value={value}
              extraProps={extraProps}
              observerextraprops={observerextraprops}
              formdata={formdata}
            />
          );
          break;
      //   case ConTypes.RelationData:
      //     // formCode
      //     render = (
      //       <RelationData
      //         value={value}
      //         config={data.extraProps}

      //       />
      //     );
      //     break;
      //   case ConTypes.TASK:
      //     // formCode
      //     render = <TagList value={value && JSON.parse(value)} />;
      //     break;
      //   case ConTypes.ADDRESS:
      //     // formCode
      //     render = <Address value={value} />;
      //     break;
      default:
        // 默认显示文字
        // console.log(value);

        // render = value;
        break;
    }
    return render || NODATA_TEXT;
  };

  render() {
    const { data } = this.props;
    const render = this.getRenderByFormData(data);
    if (render === null || render === undefined) {
      return <Text>{NODATA_TEXT}</Text>
    }
    return <View>{render}</View>;
  }
}
export default FormItemData;
