import { Button } from 'antd';
import { ButtonHTMLType, ButtonSize, ButtonType } from 'antd/es/button'
import React, { ReactNode, SyntheticEvent } from 'react'

import "./customButton.css"

type IButton = {
    type: ButtonType;
    size: ButtonSize;
    text: string;
    icon?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    htmlType?: ButtonHTMLType;
    onClick: (value: SyntheticEvent) => void;
}

const CustomButton: React.FC<IButton> = ({ type, size, text, icon, disabled=false, loading=false, onClick, htmlType="button" }) => {
  return (
    <Button 
     size={size} 
     type={type}
     id={type === "primary" ? "primary-btn" : "secondary-btn"}
     className="custom-button" 
     icon={icon} 
     htmlType={htmlType}
     disabled={disabled} loading={loading} 
     onClick={(e: SyntheticEvent) => onClick(e)}>{text}</Button>
  )
}

export default CustomButton