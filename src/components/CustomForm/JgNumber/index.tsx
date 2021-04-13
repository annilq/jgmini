import React, { PureComponent } from 'react';
import { Input, View, Text } from "remax/wechat"

import { ValidatorTypes } from '@/components/CustomForm/controlTypes';
// import { TreePicker } from '@/components/CustomForm';

interface NumberProps extends JgFormProps.IFormProps {
  extraProps?: any;
  validators?: any;
  placeholder?: string;
}

interface numberAttr {
  min?: number;
  max?: number;
  precision?: number;
}

class JgNumber extends PureComponent<NumberProps> {
  render() {
    const {
      extraProps,
      validators,
      placeholder,
      value,
      onChange,
      readOnly,
      formdata,
    } = this.props;
    // console.log(formdata[extraProps.unit]);
    // 数字的验证用antd自带的属性控制输入
    // const numberValidator =
    //   validators && validators.find(item => item.validatorType === ValidatorTypes.NUMBER);
    // const numberProps: numberAttr = {};
    // if (numberValidator) {
    //   const { validatorParam } = numberValidator;
    //   if (validatorParam.minValue) {
    //     numberProps.min = parseInt(validatorParam.minValue, 10);
    //   }
    //   if (validatorParam.maxValue) {
    //     numberProps.max = parseInt(validatorParam.maxValue, 10);
    //   }
    //   if (validatorParam.scale) {
    //     numberProps.precision = parseInt(validatorParam.scale, 10);
    //   }
    // }
    return (
      <View>
        {readOnly ? (
          <Text>  {value}</Text>
        ) : (
            <Input
              type="digit"
              value={value}
              // {...numberProps}
              placeholder={placeholder}
              onInput={onChange}
            />
          )}
        {/* {extraProps.unit && (
          <TreePicker
            extraProps={{
              nameCode: 'unit',
              url: '/api/v1/system/unit/getAllUnit',
              combineType: 2,
            }}
            readOnly
            value={formdata[extraProps.unit]}
          />
        )} */}
      </View>
    );
  }
}

export default JgNumber;
