import React, { useState } from 'react'
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
    value: string | number;
    addonUnit: (value: any) => void;
    onChange: (e: EventTarget) => void;
}

const CustomInputs: React.FC<ICustomInputs> = ({ placeholder, type, required=true, onChange, readonly=false, addonAfter, status, size="middle", value, addonUnit }) => {
    const { Option } = Select;
    const [units, setUnits] = useState<string | undefined>(addonAfter && addonAfter[0]);

    const handleUnitsChange = (e: string) => {
        setUnits(e);
        addonUnit(e);
    }

    const selectAfter = (
        <Select defaultValue={ addonAfter && addonAfter[0]} value={units} onChange={(e) => handleUnitsChange(e)}>
          {  addonAfter?.map((item, index) => {
                return(
                    <Option key={index} value={item}>{item}</Option>
                )
            })}
        </Select>
      );
      
  return (
    <Input
        placeholder={placeholder} 
        type={type} 
        onChange={(e) => onChange(e.target)}
        required={required} 
        readOnly={readonly}
        addonAfter={addonAfter && selectAfter}
        status={status}
        size={size}
        value={value}
    />
  )
}

export default CustomInputs