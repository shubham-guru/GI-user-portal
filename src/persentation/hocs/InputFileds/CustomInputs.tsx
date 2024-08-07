import React, { useState } from 'react'
import { Form, Input, Select } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';

import "./customInput.css"

type ICustomInputs = {
    placeholder: string;
    type?: string;
    required?: boolean;
    readonly?: boolean;
    name: string
    rules: Rule[]
    addonAfter?: string[];
    status?: InputStatus;
    size?: SizeType;
    value: string | number;
    label?: string;
    width?: number;
    disabled?: boolean;
    addonUnit: (value: string) => void;
    onChange?: (e: EventTarget) => void;
    maxLength?: number;
}

const CustomInputs: React.FC<ICustomInputs> = ({ placeholder, type, required = true, onChange, readonly = false, rules, addonAfter, name, status, width, disabled=false , label=false, size = "large", value, addonUnit, maxLength }) => {
    const { Option } = Select;
    const [units, setUnits] = useState<string | undefined>(addonAfter && addonAfter[0]);

    const handleUnitsChange = (e: string) => {
        setUnits(e);
        addonUnit(e);
    }

    const selectAfter = (
        <Select defaultValue={units ? units : addonAfter && addonAfter[0]} value={units} onChange={(e) => handleUnitsChange(e)}>
            {addonAfter?.map((item, index) => {
                return (
                    <Option key={index} value={item}>{item}</Option>
                )
            })}
        </Select>
    );

    return (
        <Form.Item
            name={name}
            rules={rules}
            label={label ? label : null}
        >
            <Input
                placeholder={placeholder}
                type={type}
                style={{ width: `${width}cqmax`, textTransform: (name === "panCard") || (name === "gst") || (name === "iec") ? "uppercase" : "none" }}
                onChange={(e) => onChange && onChange(e.target)}
                required={required}
                readOnly={readonly}
                maxLength={maxLength}
                disabled={disabled}
                addonAfter={addonAfter && selectAfter}
                status={status}
                size={size}
                value={value}
            />
        </Form.Item>

    )
}

export default CustomInputs