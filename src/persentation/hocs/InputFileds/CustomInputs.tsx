import React from 'react'
import { Input, Select } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { SizeType } from 'antd/es/config-provider/SizeContext';

import "./customInput.css"

type ICustomInputs = {
    placeholder: string;
    type: string;
    required?: boolean;
    readonly?: boolean;
    addonAfter?: string[];
    status?: InputStatus;
    size?: SizeType;
    onChange: (e: string) => void;
}

const CustomInputs: React.FC<ICustomInputs> = ({ placeholder, type, required=true, onChange, readonly=false, addonAfter, status, size="middle" }) => {
    const { Option } = Select;

    const selectAfter = (
        <Select defaultValue={ addonAfter && addonAfter[0]}>
          {  addonAfter?.map((item, index) => {
                return(
                    <Option key={index} value={item}>{item}</Option>
                )
            })}
        </Select>
      );
      
  return (
    <Input placeholder={placeholder} 
        type={type} 
        onChange={(e) => onChange(e.target.value)} 
        required={required} 
        readOnly={readonly}
        addonAfter={ addonAfter && selectAfter}
        status={status}
        size={size}
    />
  )
}

export default CustomInputs